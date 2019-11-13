import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestData } from '../../../modules/tests/test-data/test-data.reducer';
import {
  getETA,
  getEco,
} from '../../../modules/tests/test-data/test-data.selector';
import { map, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import {
  getSeriousOrDangerousFaults,
  getDrivingFaults,
  getTestOutcome,
  getEyesightTestSeriousFault,
} from '../debrief.selector';
import {
  getManoeuvreFaults,
  getControlledStopFault,
  getVehicleCheckSeriousFaults,
  getVehicleCheckDangerousFaults,
  getVehicleCheckDrivingFaults,
  getControlledStopFaultAndComment,
} from '../cat-b/debrief.cat-b.selector';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import {
  MultiFaultAssignableCompetency,
  CommentedCompetency,
} from '../../../shared/models/fault-marking.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from 'ng2-translate';
import { ETA, Eco } from '@dvsa/mes-test-schema/categories/Common';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from
  '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_B, DASHBOARD_PAGE } from '../../page-names.constants';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';

interface DebriefPageState {
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<MultiFaultAssignableCompetency[]>;
  drivingFaultCount$: Observable<number>;
  etaFaults$: Observable<ETA>;
  ecoFaults$: Observable<Eco>;
  testResult$: Observable<string>;
  conductedLanguage$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'debrief-cat-b-page',
  templateUrl: 'debrief.cat-b.page.html',
})

export class DebriefCatBPage extends PracticeableBasePageComponent {

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
    store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    private translate: TranslateService,
    private faultCountProvider: FaultCountProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    this.pageState = {
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          return [
            ...getSeriousOrDangerousFaults(data.seriousFaults),
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.S).map(fault => fault.competencyIdentifier),
            ...getControlledStopFault(data.controlledStop, CompetencyOutcome.S),
            ...getVehicleCheckSeriousFaults(data.vehicleChecks).map(fault => fault.competencyIdentifier),
            ...getEyesightTestSeriousFault(data.eyesightTest),
          ];
        }),
      ),
      dangerousFaults$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          return [
            ...getSeriousOrDangerousFaults(data.dangerousFaults),
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.D).map(fault => fault.competencyIdentifier),
            ...getControlledStopFault(data.controlledStop, CompetencyOutcome.D),
            ...getVehicleCheckDangerousFaults(data.vehicleChecks).map(fault => fault.competencyIdentifier),
          ];
        }),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          return [
            ...getDrivingFaults(data.drivingFaults),
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.DF).map(
              (result: CommentedCompetency): MultiFaultAssignableCompetency => ({
                faultCount: 1,
                competencyDisplayName: result.competencyDisplayName,
                competencyIdentifier: result.competencyIdentifier,
                source: result.source,
              })),
            ...getControlledStopFaultAndComment(data.controlledStop, CompetencyOutcome.DF).map(
              (result: CommentedCompetency): MultiFaultAssignableCompetency => ({
                faultCount: 1,
                competencyDisplayName: result.competencyDisplayName,
                competencyIdentifier: result.competencyIdentifier,
                source: result.source,
              })),
            ...getVehicleCheckDrivingFaults(data.vehicleChecks).map(
              (result: CommentedCompetency): MultiFaultAssignableCompetency => ({
                faultCount: 1,
                competencyDisplayName: result.competencyDisplayName,
                competencyIdentifier: result.competencyIdentifier,
                source: result.source,
              }),
            ),
          ];
        }),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(this.faultCountProvider.getDrivingFaultSummaryCount),
      ),
      etaFaults$: currentTest$.pipe(
        select(getTestData),
        select(getETA),
      ),
      ecoFaults$: currentTest$.pipe(
        select(getTestData),
        select(getEco),
      ),
      testResult$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
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
    super.ionViewDidLeave();
    if (this.isTestReportPracticeMode) {
      if (super.isIos()) {
        this.screenOrientation.unlock();
        this.insomnia.allowSleepAgain();
      }
    }

    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }

  endDebrief(): void {
    if (this.isTestReportPracticeMode) {
      const dashboardPage = this.navController.getViews().find(view => view.id === DASHBOARD_PAGE);
      this.navController.popTo(dashboardPage, { animate: false });
      return;
    }
    this.store$.dispatch(new EndDebrief());
    if (this.outcome === 'Pass') {
      this.navController.push(CAT_B.PASS_FINALISATION_PAGE);
      return;
    }
    this.navController.push(CAT_B.POST_DEBRIEF_HOLDING_PAGE).then(() => {
      const testReportPage = this.navController.getViews().find(view => view.id === CAT_B.TEST_REPORT_PAGE);
      if (testReportPage) {
        this.navController.removeView(testReportPage);
      }
      const debriefPage = this.navController.getViews().find(view => view.id === CAT_B.DEBRIEF_PAGE);
      if (debriefPage) {
        this.navController.removeView(debriefPage);
      }
    });
  }

}
