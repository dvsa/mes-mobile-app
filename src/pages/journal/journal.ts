import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  IonicPage, Loading, LoadingController, NavController,
  NavParams, Platform, Refresher, ModalController,
} from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';

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
import { SearchProvider } from '../../providers/search/search';
import { AdvancedSearchParams } from '../../providers/search/search.models';
import { formatApplicationReference, removeLeadingZeros } from '../../shared/helpers/formatters';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { ApplicationReference } from '@dvsa/mes-test-schema/categories/common';
import { hasStartedTests } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { AddCompletedTests } from '../../modules/tests/tests.actions';
import moment from 'moment';
import { getStaffNumber } from '../../modules/tests/journal-data/common/examiner/examiner.selector';
import { getExaminer } from '../../modules/tests/journal-data/common/examiner/examiner.reducer';

interface JournalPageState {
  selectedDate$: Observable<string>;
  slots$: Observable<SlotItem[]>;
  error$: Observable<MesError>;
  isLoading$: Observable<boolean>;
  lastRefreshedTime$: Observable<string>;
  appVersion$: Observable<string>;
  hasStartedTests$: Observable<boolean>;
  completedTests$: Observable<number[]>;
  examinerId$: Observable<string>;
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
  searchResultsAppRefs: number[];
  isCachedTests: boolean;
  staffNumber: string;

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
      hasStartedTests$: this.store$.pipe(
        select(getTests),
        select(hasStartedTests),
      ),
      completedTests$: this.store$.pipe(
        select(getTests),
        select(() => {
          return [];
        }),
      ),
      examinerId$: this.store$.pipe(
        select(getJournalState),
        select(getExaminer),
        select(getStaffNumber),
      ),
    };

    const {
      selectedDate$, slots$, error$, isLoading$, hasStartedTests$, completedTests$, examinerId$,
    } = this.pageState;

    // Merge observables into one
    this.merged$ = merge(
      examinerId$.pipe(map((value) => {
        this.staffNumber = value;
      })),
      selectedDate$.pipe(map(this.setSelectedDate)),
      hasStartedTests$.pipe(map(this.setCachedTests)),
      completedTests$.pipe(map(this.setCompletedTests)),
      slots$.pipe(
        map(this.generateSlotAndSearchResults),
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
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.loadJournalManually();
    this.setupPolling();

    this.store$.dispatch(new journalActions.LoadCompletedTests());

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

  /**selectedDate
   * If state contains no cached data and search hasn't
   * previously returned results then get users search results
   * otherwise get create slot data directly
   * @param emission
   */
  generateSlotAndSearchResults = (emission: SlotItem[]) => {
    if (!this.isCachedTests && this.searchResultsAppRefs.length === 0) {
      this.getSearchResults(emission);
    }
    this.createSlots(emission, this.searchResultsAppRefs);
  }

  /**
   * Call endpoint to obtain users previously completed tests and
   * pass to createSlots function for evaluation
   * @param emission
   */
  getSearchResults = (emission: SlotItem[]) => {
    const advancedSearchParams: AdvancedSearchParams = {
      startDate: moment().subtract(14, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      staffNumber: removeLeadingZeros(this.staffNumber),
      costCode: '',
    };
    return new Promise((resolve) => {
      this.searchProvider.advancedSearch(advancedSearchParams)
        .subscribe((searchResultsTemp) => {
          const searchResultsAppRefs = searchResultsTemp.map((res) => {
            return res.applicationReference;
          });
          this.store$.dispatch(new AddCompletedTests(searchResultsAppRefs));
          this.createSlots(emission, searchResultsAppRefs);
          resolve();
        },
          (err) => {
            resolve();
            return this.showError(err);
          },
        );
    });
  }

  /**
   * Search for slots appReference in returned search results
   * @param slot
   * @param references
   */
  hasSlotBeenTested(slot, references): boolean {
    if (!references) {
      return false;
    }

    const applicationReference: ApplicationReference = {
      applicationId: slot.slotData.booking.application.applicationId,
      bookingSequence: slot.slotData.booking.application.bookingSequence,
      checkDigit: slot.slotData.booking.application.checkDigit,
    };

    return references.some((reference) => {
      return reference === parseInt(formatApplicationReference(applicationReference), 10);
    });
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

  setCachedTests = (cachedTests: boolean): void => {
    this.isCachedTests = cachedTests;
  }

  setCompletedTests = (completedTests: number[]): void => {
    this.searchResultsAppRefs = completedTests;
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

  private createSlots = (emission: SlotItem[], searchresults?) => {
    // Clear any dynamically created slots before adding the latest
    this.slotContainer.clear();

    if (!Array.isArray(emission)) return;

    if (emission.length === 0) return;

    const slots = this.slotSelector.getSlotTypes(emission);

    let lastLocation;
    for (const slot of slots) {
      const factory = this.resolver.resolveComponentFactory(slot.component);
      const componentRef = this.slotContainer.createComponent(factory);
      const alreadyTested = this.hasSlotBeenTested(slot, searchresults);

      (<SlotComponent>componentRef.instance).slot = slot.slotData;
      (<SlotComponent>componentRef.instance).hasSlotChanged = slot.hasSlotChanged;
      (<SlotComponent>componentRef.instance).showLocation = (slot.slotData.testCentre.centreName !== lastLocation);
      (<SlotComponent>componentRef.instance).disable = alreadyTested;
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
    this.loadJournalManually();
  }

  async logout() {
    this.store$.dispatch(new journalActions.UnloadJournal());
    await super.logout();
  }
}
