import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  IonicPage, Loading, LoadingController, NavController,
  NavParams, Platform, Refresher, ModalController,
} from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from './journal.actions';
import { StoreModel } from '../../shared/models/store.model';
import {
  getError, getIsLoading, getSelectedDate, getLastRefreshed,
  getLastRefreshedTime, getSlotsOnSelectedDate,
} from './journal.selector';
import { getJournalState } from './journal.reducer';
import { MesError } from '../../shared/models/mes-error.model';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { SlotComponent } from '../../components/test-slot/slot/slot';
import { merge } from 'rxjs/observable/merge';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { IncompleteTestsProvider } from '../../providers/incomplete-tests/incomplete-tests';
import { ERROR_PAGE } from '../page-names.constants';
import { App } from './../../app/app.component';
import { ErrorTypes } from '../../shared/models/error-message';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';

interface JournalPageState {
  selectedDate$: Observable<string>;
  slots$: Observable<SlotItem[]>;
  error$: Observable<MesError>;
  isLoading$: Observable<boolean>;
  lastRefreshedTime$: Observable<string>;
  appVersion$: Observable<string>;
  incompleteTestCounter$: Observable<number>;
}

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})

export class JournalPage extends BasePageComponent implements OnInit {

  @ViewChild('slotContainer', { read: ViewContainerRef }) slotContainer;

  pageState: JournalPageState;
  selectedDate: string;
  loadingSpinner: Loading;
  pageRefresher: Refresher;
  isUnauthenticated: boolean;
  subscription: Subscription;
  employeeId: string;
  start = '2018-12-10T08:10:00+00:00';
  merged$: Observable<void | number>;

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
    public analytics: AnalyticsProvider,
    public dateTimeProvider: DateTimeProvider,
    public appConfigProvider: AppConfigProvider,
    public incompleteTestsProvider: IncompleteTestsProvider,
    private app: App,
    private deviceProvider: DeviceProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,

  ) {
    super(platform, navController, authenticationProvider);
    this.analytics.initialiseAnalytics().then(() => console.log('journal analytics initialised'));
    this.employeeId = this.authenticationProvider.getEmployeeId();
    this.isUnauthenticated = this.authenticationProvider.isInUnAuthenticatedMode();
    this.store$.dispatch(new journalActions.SetSelectedDate(this.dateTimeProvider.now().format('YYYY-MM-DD')));
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
      incompleteTestCounter$: this.incompleteTestsProvider.calculateIncompleteTests(),
    };

    const { selectedDate$, slots$, error$, isLoading$, incompleteTestCounter$ } = this.pageState;

    // Merge observables into one
    this.merged$ = merge(
      selectedDate$.pipe(map(this.setSelectedDate)),
      slots$.pipe(
        map(this.createSlots),
      ),
      // Run any transformations necessary here
      error$.pipe(map(this.showError)),
      isLoading$.pipe(map(this.handleLoadingUI)),
      incompleteTestCounter$,
    );

  }

  ionViewDidLeave(): void {
    // Using .merge helps with unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.loadJournalManually();
    this.setupPolling();

    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }

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
    }
  }

  public pullRefreshJournal = (refresher: Refresher) => {
    this.loadJournalManually();
    this.pageRefresher = refresher;
  }

  public refreshJournal = () => {
    this.loadJournalManually();
  }

  gotoWaitingRoom($event) {
    console.log('going to waiting room with ', $event);
  }

  logout() {
    this.store$.dispatch(new journalActions.UnloadJournal());
    super.logout();
  }

  showTestReportPracticeMode = (): boolean =>
    this.appConfigProvider.getAppConfig().journal.enableTestReportPracticeMode

  showEndToEndPracticeMode = (): boolean =>
    this.appConfigProvider.getAppConfig().journal.enableEndToEndPracticeMode
}
