import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  IonicPage,
  Loading,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  Platform,
  Refresher,
} from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from './../../modules/journal/journal.actions';
import { StoreModel } from '../../shared/models/store.model';
import {
  getCompletedTests,
  getError,
  getIsLoading,
  getLastRefreshed,
  getLastRefreshedTime,
  getSelectedDate,
  getSlotsOnSelectedDate,
} from '../../modules/journal/journal.selector';
import { getJournalState } from '../../modules/journal/journal.reducer';
import { MesError } from '../../shared/models/mes-error.model';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ERROR_PAGE } from '../page-names.constants';
import { App } from '../../app/app.component';
import { ErrorTypes } from '../../shared/models/error-message';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';
import { IncompleteTestsBanner } from '../../components/common/incomplete-tests-banner/incomplete-tests-banner';
import { DateTime } from '../../shared/helpers/date-time';
import { SearchProvider } from '../../providers/search/search';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import {
  CompletedTestPersistenceProvider,
} from '../../providers/completed-test-persistence/completed-test-persistence';

interface JournalPageState {
  selectedDate$: Observable<string>;
  slots$: Observable<SlotItem[]>;
  error$: Observable<MesError>;
  isLoading$: Observable<boolean>;
  lastRefreshedTime$: Observable<string>;
  appVersion$: Observable<string>;
  completedTests$: Observable<SearchResultTestSchema[]>;
}

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})

export class JournalPage extends BasePageComponent implements OnInit {

  @ViewChild('slotContainer', { read: ViewContainerRef }) slotContainer;

  @ViewChild(IncompleteTestsBanner)
  incompleteTestsBanner: IncompleteTestsBanner;

  pageState: JournalPageState;
  selectedDate: string;
  loadingSpinner: Loading;
  pageRefresher: Refresher;
  isUnauthenticated: boolean;
  subscription: Subscription;
  employeeId: string;
  start = '2018-12-10T08:10:00+00:00';
  merged$: Observable<void | number>;
  todaysDate: DateTime;
  completedTests: SearchResultTestSchema[];
  platformSubscription: Subscription;

  constructor(
    public modalController: ModalController,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public navParams: NavParams,
    public loadingController: LoadingController,
    private store$: Store<StoreModel>,
    public dateTimeProvider: DateTimeProvider,
    public appConfigProvider: AppConfigProvider,
    private app: App,
    private deviceProvider: DeviceProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    public searchProvider: SearchProvider,
    private completedTestPersistenceProvider: CompletedTestPersistenceProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.employeeId = this.authenticationProvider.getEmployeeId();
    this.isUnauthenticated = this.authenticationProvider.isInUnAuthenticatedMode();
    this.store$.dispatch(new journalActions.SetSelectedDate(this.dateTimeProvider.now().format('YYYY-MM-DD')));
    this.todaysDate = this.dateTimeProvider.now();
  }

  ngOnInit(): void {
    this.pageState = {
      selectedDate$: this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
      ),
      slots$: this.store$.pipe(
        select(getJournalState),
        map(getSlotsOnSelectedDate),
      ),
      error$: this.store$.pipe(
        select(getJournalState),
        map(getError),
      ),
      isLoading$: this.store$.pipe(
        select(getJournalState),
        map(getIsLoading),
      ),
      lastRefreshedTime$: this.store$.pipe(
        select(getJournalState),
        map(getLastRefreshed),
        map(getLastRefreshedTime),
      ),
      appVersion$: this.store$.pipe(
        select(getAppInfoState),
        map(getVersionNumber),
      ),
      completedTests$: this.store$.pipe(
        select(getJournalState),
        select(getCompletedTests),
      ),
    };

    const { selectedDate$, error$, isLoading$, completedTests$ } = this.pageState;

    this.merged$ = merge(
      selectedDate$.pipe(map(this.setSelectedDate)),
      completedTests$.pipe(map(this.setCompletedTests)),
      error$.pipe(map(this.showError)),
      isLoading$.pipe(map(this.handleLoadingUI)),
    );

  }

  ionViewDidLeave(): void {
    // Using .merge helps with unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async ionViewWillEnter() {
    super.ionViewWillEnter();
    await this.loadJournalManually();
    this.setupPolling();
    this.configurePlatformSubscriptions();
    await this.completedTestPersistenceProvider.loadCompletedPersistedTests();

    this.store$.dispatch(new journalActions.LoadCompletedTests(true));

    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
    this.todaysDate = this.dateTimeProvider.now();

    return true;
  }

  ionViewWillLeave(): void {
    this.store$.dispatch(new journalActions.StopPolling());

    if (this.platformSubscription) {
      this.platformSubscription.unsubscribe();
    }
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new journalActions.JournalViewDidEnter());

    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }
  }

  async loadJournalManually() {
    this.store$.dispatch(new journalActions.LoadJournal());
  }

  setupPolling() {
    this.store$.dispatch(new journalActions.SetupPolling());
  }

  configurePlatformSubscriptions(): void {
    if (super.isIos()) {
      const merged$ = merge(
        this.platform.resume.pipe(switchMap(async () => this.refreshJournal())),
      );
      this.platformSubscription = merged$.subscribe();
    }
  }

  setSelectedDate = (selectedDate: string): void => {
    this.selectedDate = selectedDate;
  }

  setCompletedTests = (completedTests: SearchResultTestSchema[]): void => {
    this.completedTests = completedTests;
  }

  handleLoadingUI = (isLoading: boolean): void => {
    if (isLoading && !this.loadingSpinner) {
      this.loadingSpinner = this.loadingController.create({
        dismissOnPageChange: true,
        spinner: 'circles',
      });
      this.loadingSpinner.present();
      return;
    }
    this.pageRefresher ? this.pageRefresher.complete() : null;

    if (!isLoading && this.loadingSpinner) {
      this.loadingSpinner.dismissAll();
      this.loadingSpinner = null;
    }
  }

  showError = (error: MesError): void => {
    if (error === undefined || error.message === '') return;

    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const errorModal = this.modalController.create(
      ERROR_PAGE,
      { type: ErrorTypes.JOURNAL_REFRESH },
      { cssClass: zoomClass });
    errorModal.present();
  }

  public pullRefreshJournal = async(refresher: Refresher) => {
    await this.loadJournalManually();
    this.loadCompletedTestsWithCallThrough();
    this.pageRefresher = refresher;
  }

  public refreshJournal = async() => {
    await this.loadJournalManually();
    this.loadCompletedTestsWithCallThrough();
  }

  private loadCompletedTestsWithCallThrough = () => {

    // When manually refreshing the journal we want to check
    // if any of the tests have already been submitted by another device
    // So we must make the Load Completed Tests request
    // And that's why we set the callThrough property to true
    const callThrough = true;
    this.store$.dispatch(new journalActions.LoadCompletedTests(callThrough));
  }

  async logout() {
    this.store$.dispatch(new journalActions.UnloadJournal());
    await super.logout();
  }
}
