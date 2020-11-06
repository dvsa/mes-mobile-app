import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  IonicPage, Loading, LoadingController, NavController,
  NavParams, Platform, Refresher, ModalController,
} from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, merge, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from './../../modules/journal/journal.actions';
import { StoreModel } from '../../shared/models/store.model';
import {
  getError, getIsLoading, getSelectedDate, getLastRefreshed,
  getLastRefreshedTime, getSlotsOnSelectedDate,
} from './../../modules/journal/journal.selector';
import { getJournalState } from './../../modules/journal/journal.reducer';
import { MesError } from '../../shared/models/mes-error.model';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { SlotComponent } from '../../components/test-slot/slot/slot';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ERROR_PAGE } from '../page-names.constants';
import { App } from './../../app/app.component';
import { ErrorTypes } from '../../shared/models/error-message';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';
import { PersonalCommitmentSlotComponent } from './personal-commitment/personal-commitment';
import { TestSlotComponent } from '../../components/test-slot/test-slot/test-slot';
import { IncompleteTestsBanner } from '../../components/common/incomplete-tests-banner/incomplete-tests-banner';
import { DateTime } from '../../shared/helpers/date-time';
import { HttpErrorResponse } from '@angular/common/http';
import { Log, LogType } from '../../shared/models/log.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { SearchProvider } from '../../providers/search/search';
import { AdvancedSearchParams } from '../../providers/search/search.models';
import { removeLeadingZeros } from '../../shared/helpers/formatters';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { LogHelper } from '../../providers/logs/logsHelper';

interface JournalPageState {
  selectedDate$: Observable<string>;
  slots$: Observable<SlotItem[]>;
  error$: Observable<MesError>;
  isLoading$: Observable<boolean>;
  lastRefreshedTime$: Observable<string>;
  appVersion$: Observable<string>;
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
  searchResults: SearchResultTestSchema[] = [];
  searchSubscription: Subscription = Subscription.EMPTY;

  constructor(
    public modalController: ModalController,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public navParams: NavParams,
    public loadingController: LoadingController,
    private store$: Store<StoreModel>,
    private slotSelector: SlotSelectorProvider,
    private resolver: ComponentFactoryResolver,
    public dateTimeProvider: DateTimeProvider,
    public appConfigProvider: AppConfigProvider,
    private app: App,
    private deviceProvider: DeviceProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    public searchProvider: SearchProvider,
    private logHelper: LogHelper,
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
    };

    const { selectedDate$, slots$, error$, isLoading$ } = this.pageState;

    // Merge observables into one
    this.merged$ = merge(
      selectedDate$.pipe(map(this.setSelectedDate)),
      slots$.pipe(
        map(this.createSlots),
      ),
      // Run any transformations necessary here
      error$.pipe(map(this.showError)),
      isLoading$.pipe(map(this.handleLoadingUI)),
    );

  }

  ionViewDidLeave(): void {
    // Using .merge helps with unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();

    // TODO add if here to check for cache, if no cache call search endpoint, loadjournal and compare
    //  else just loadjournal
    this.searchForCompletedTests();
    this.loadJournalManually();
    this.journalComparison();
    this.setupPolling();

    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
    this.todaysDate = this.dateTimeProvider.now();

    return true;
  }

  ionViewWillLeave() {
    this.store$.dispatch(new journalActions.StopPolling());
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new journalActions.JournalViewDidEnter());

    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }
  }

  searchForCompletedTests(): void {

    const advancedSearchParams: AdvancedSearchParams = {
      startDate: '',
      endDate: '',
      staffNumber: removeLeadingZeros('78471231'),
      costCode: '',
    };

    console.log('im gonna search');

    // start spinner
    this.searchSubscription = this.searchProvider.advancedSearch(advancedSearchParams)
      .pipe(
        map((results) => {
          console.log('resultsHere', results);
          this.searchResults = results;
          // stop spinner
        }),
        catchError((err: HttpErrorResponse) => {
          const log: Log = this.logHelper
            .createLog(
              LogType.ERROR, `Advanced search with params (${advancedSearchParams})`, err.message,
            );
          this.store$.dispatch(new SaveLog(log));
          this.searchResults = [];
          // stop spinner
          if (err) {
            this.showError(err);
          }
          return of(console.log('ERROR', JSON.stringify(err)));
        }),
      ).subscribe();

    console.log('results2', this.searchResults);
  }

  journalComparison() {
    console.log('JC results', this.searchResults);
    console.log('slotdata', this.pageState.slots$);
    console.log('subscription', this.subscription);
  }

  loadJournalManually() {
    this.store$.dispatch(new journalActions.LoadJournal());
  }

  setupPolling() {
    this.store$.dispatch(new journalActions.SetupPolling());
  }

  setSelectedDate = (selectedDate: string): void => {
    this.selectedDate = selectedDate;
  }

  handleLoadingUI = (isLoading: boolean): void => {
    if (isLoading) {
      this.loadingSpinner = this.loadingController.create({
        dismissOnPageChange: true,
        spinner: 'circles',
      });
      this.loadingSpinner.present();
      return;
    }
    this.pageRefresher ? this.pageRefresher.complete() : null;
    if (this.loadingSpinner) {
      this.loadingSpinner.dismiss();
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

  private createSlots = (emission: SlotItem[]) => {
    // Clear any dynamically created slots before adding the latest
    this.slotContainer.clear();

    if (!Array.isArray(emission)) return;

    if (emission.length === 0) return;

    const slots = this.slotSelector.getSlotTypes(emission);
    let lastLocation;
    for (const slot of slots) {
      const factory = this.resolver.resolveComponentFactory(slot.component);
      const componentRef = this.slotContainer.createComponent(factory);

      (<SlotComponent>componentRef.instance).slot = slot.slotData;
      (<SlotComponent>componentRef.instance).hasSlotChanged = slot.hasSlotChanged;
      (<SlotComponent>componentRef.instance).showLocation = (slot.slotData.testCentre.centreName !== lastLocation);
      lastLocation = slot.slotData.testCentre.centreName;

      if (componentRef.instance instanceof PersonalCommitmentSlotComponent) {
        // if this is a personal commitment assign it to the component
        (<PersonalCommitmentSlotComponent>componentRef.instance).personalCommitments = slot.personalCommitment;
      }

      if (componentRef.instance instanceof TestSlotComponent) {
        // if this is a test slot assign hasSeenCandidateDetails separately
        (<TestSlotComponent>componentRef.instance).hasSeenCandidateDetails = slot.hasSeenCandidateDetails;
      }
    }
  }

  public pullRefreshJournal = (refresher: Refresher) => {
    this.loadJournalManually();
    this.pageRefresher = refresher;
  }

  public refreshJournal = () => {
    console.log('results', this.searchResults);
    this.loadJournalManually();
  }

  async logout() {
    this.store$.dispatch(new journalActions.UnloadJournal());
    await super.logout();
  }
}
