import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { Observable, Subscription, merge } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getETA } from '../../../modules/tests/test-data/common/test-data.selector';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Component } from '@angular/core';
import { getTestOutcome } from '../debrief.selector';
import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { ETA } from '@dvsa/mes-test-schema/categories/common';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from
  '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_A_MOD1 } from '../../page-names.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { TestOutcome } from '../../../shared/models/test-outcome';
import {
  getAvoidance,
  getAvoidanceAttempted,
} from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { getEmergencyStop } from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import { Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';

interface DebriefPageState {
  testCategory$: Observable<TestCategory>;
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<FaultSummary[]>;
  drivingFaultCount$: Observable<number>;
  etaFaults$: Observable<ETA>;
  testResult$: Observable<string>;
  conductedLanguage$: Observable<string>;
  candidateName$: Observable<string>;
  emergencyStop$: Observable<EmergencyStop>;
  avoidance$: Observable<Avoidance>;
  avoidanceAttempted$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.debrief-cat-a-mod1-page',
  templateUrl: 'debrief.cat-a-mod1.page.html',
})

export class DebriefCatAMod1Page extends BasePageComponent {

  pageState: DebriefPageState;
  subscription: Subscription;
  isPassed: boolean;
  category: TestCategory = TestCategory.EUAM1;

  // Used for now to test displaying pass/fail/terminated messages
  public outcome: string;

  public hasPhysicalEta: boolean = false;
  public hasVerbalEta: boolean = false;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    private translate: TranslateService,
    private faultCountProvider: FaultCountProvider,
    public faultSummaryProvider: FaultSummaryProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const testCategory$ = currentTest$.pipe(
      select(getTestCategory),
      map(testCategory => testCategory as TestCategory),
    );
    this.pageState = {
      testCategory$,
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        map(data =>
          this.faultSummaryProvider.getSeriousFaultsList(data, TestCategory.EUAM1)
          .map(fault => fault.competencyIdentifier)),
      ),
      dangerousFaults$: currentTest$.pipe(
        select(getTestData),
        map(data =>
          this.faultSummaryProvider.getDangerousFaultsList(data, TestCategory.EUAM1)
          .map(fault => fault.competencyIdentifier)),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        map(data => this.faultSummaryProvider.getDrivingFaultsList(data, TestCategory.EUAM1)),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(testCategory$),
        map(([testData, category]) => {
          return this.faultCountProvider.getDrivingFaultSumCount(category as TestCategory, testData);
        }),
      ),
      etaFaults$: currentTest$.pipe(
        select(getTestData),
        select(getETA),
      ),
      testResult$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      emergencyStop$: currentTest$.pipe(
        select(getTestData),
        select(getEmergencyStop),
      ),
      avoidance$: currentTest$.pipe(
        select(getTestData),
        select(getAvoidance),
      ),
      avoidanceAttempted$: currentTest$.pipe(
        select(getTestData),
        select(getAvoidance),
        select(getAvoidanceAttempted),
      ),
    };

    const { testResult$, etaFaults$, conductedLanguage$ } = this.pageState;

    this.subscription = merge(
      testResult$.pipe(map(result => this.outcome = result)),
      etaFaults$.pipe(
        map((eta) => {
          this.hasPhysicalEta = eta.physical;
          this.hasVerbalEta = eta.verbal;
        }),
      ),
      conductedLanguage$.pipe(tap(value => configureI18N(value as Language, this.translate))),
    ).subscribe();
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new DebriefViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }

  endDebrief(): void {
    this.store$.dispatch(new EndDebrief());
    if (this.outcome === TestOutcome.PASS) {
      this.navController.push(CAT_A_MOD1.PASS_FINALISATION_PAGE);
      return;
    }
    this.navController.push(CAT_A_MOD1.POST_DEBRIEF_HOLDING_PAGE);
  }

}
