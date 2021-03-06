import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getETA, getEco } from '../../../modules/tests/test-data/common/test-data.selector';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { getTestOutcome } from '../debrief.selector';
import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { ETA, Eco, CategoryCode, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from
  '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_HOME_TEST } from '../../page-names.constants';
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
import { getVehicleChecks } from '../../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';

interface DebriefPageState {
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<FaultSummary[]>;
  drivingFaultCount$: Observable<number>;
  etaFaults$: Observable<ETA>;
  ecoFaults$: Observable<Eco>;
  testResult$: Observable<string>;
  conductedLanguage$: Observable<string>;
  candidateName$: Observable<string>;
  category$: Observable<CategoryCode>;
  tellMeShowMeQuestions$: Observable<QuestionResult[]>;
}

@IonicPage()
@Component({
  selector: '.debrief-cat-home-test-page',
  templateUrl: 'debrief.cat-home-test.page.html',
})

export class DebriefCatHomeTestPage extends BasePageComponent {

  pageState: DebriefPageState;
  subscription: Subscription;
  isPassed: boolean;

  // Used for now to test displaying pass/fail/terminated messages
  public outcome: string;

  public hasPhysicalEta: boolean = false;
  public hasVerbalEta: boolean = false;

  public adviceGivenControl: boolean = false;
  public adviceGivenPlanning: boolean = false;

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
    private faultSummaryProvider: FaultSummaryProvider,
    private testDataByCategoryProvider: TestDataByCategoryProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const category$ = currentTest$.pipe(
      select(getTestCategory),
    );

    this.pageState = {
      seriousFaults$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => {
          const testData = this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data);
          return this.faultSummaryProvider.getSeriousFaultsList(testData, category as TestCategory)
          .map(fault => fault.competencyIdentifier);
        }),
      ),
      dangerousFaults$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => {
          const testData = this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data);
          return this.faultSummaryProvider.getDangerousFaultsList(testData, category as TestCategory)
          .map(fault => fault.competencyIdentifier);
        }),

      ),
      drivingFaults$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => {
          const testData = this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data);
          return this.faultSummaryProvider.getDrivingFaultsList(testData, category as TestCategory);
        }),
      ),
      drivingFaultCount$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => {
          const testData = this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data);
          return this.faultCountProvider.getDrivingFaultSumCount(category as TestCategory, testData);
        }),
      ),
      etaFaults$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data)),
        select(getETA),
      ),
      ecoFaults$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data)),
        select(getEco),
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
      category$: currentTest$.pipe(
        select(getTestCategory),
      ),
      tellMeShowMeQuestions$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data, category]) => this.testDataByCategoryProvider.getTestDataByCategoryCode(category)(data)),
        select(getVehicleChecks),
        map(checks => [...checks.tellMeQuestions, ...checks.showMeQuestions]),
        map(checks => checks.filter(c => c.code !== undefined)),
      ),
    };

    const { testResult$, etaFaults$, ecoFaults$, conductedLanguage$ } = this.pageState;

    this.subscription = merge(
      testResult$.pipe(map(result => this.outcome = result)),
      etaFaults$.pipe(
        map((eta) => {
          this.hasPhysicalEta = eta.physical;
          this.hasVerbalEta = eta.verbal;
        }),
      ),
      ecoFaults$.pipe(
        map((eco) => {
          this.adviceGivenControl = eco.adviceGivenControl;
          this.adviceGivenPlanning = eco.adviceGivenPlanning;
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
      this.navController.push(CAT_HOME_TEST.PASS_FINALISATION_PAGE);
      return;
    }
    this.navController.push(CAT_HOME_TEST.POST_DEBRIEF_HOLDING_PAGE);
  }

}
