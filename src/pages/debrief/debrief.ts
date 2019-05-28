import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {
  getCurrentTest,
  isTestReportPracticeTest,
  getJournalData,
} from '../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../../pages/debrief/debrief.actions';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import {
  getETA,
  getEco,
  getDrivingFaultSummaryCount,
} from '../../modules/tests/test-data/test-data.selector';
import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import {
  getSeriousOrDangerousFaults,
  getDrivingFaults,
  getManoeuvreFaults,
  getTestOutcome,
  getControlledStopFault,
  getVehicleCheckSeriousFault,
  getVehicleCheckDangerousFault,
  getVehicleCheckDrivingFault,
} from './debrief.selector';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { MultiFaultAssignableCompetency } from '../../shared/models/fault-marking.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from 'ng2-translate';
import { getTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import { ETA, Eco } from '@dvsa/mes-test-schema/categories/B';

interface DebriefPageState {
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<MultiFaultAssignableCompetency[]>;
  drivingFaultCount$: Observable<number>;
  etaFaults$: Observable<ETA>;
  ecoFaults$: Observable<Eco>;
  testResult$: Observable<string>;
  practiceTest$: Observable<boolean>;
  welshTest$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-debrief',
  templateUrl: 'debrief.html',
})

export class DebriefPage extends PracticeableBasePageComponent {

  pageState: DebriefPageState;
  subscription: Subscription;

  // Used for now to test displaying pass/fail/terminated messages
  public outcome: string;
  public isPracticeTest: boolean;

  public hasPhysicalEta: boolean = false;
  public hasVerbalEta: boolean = false;

  public adviceGivenControl: boolean = false;
  public adviceGivenPlanning: boolean = false;

  constructor(
    store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    private translate: TranslateService,
  ) {
    super(platform, navCtrl, authenticationProvider, store$);
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
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.S).map(fault => fault.competencyIdentifier),
            ...getSeriousOrDangerousFaults(data.seriousFaults),
            ...getVehicleCheckSeriousFault(data.vehicleChecks),
            ...getControlledStopFault(data.controlledStop, CompetencyOutcome.S),
          ];
        }),
      ),
      dangerousFaults$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          return [
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.D).map(fault => fault.competencyIdentifier),
            ...getSeriousOrDangerousFaults(data.dangerousFaults),
            ...getVehicleCheckDangerousFault(data.vehicleChecks),
            ...getControlledStopFault(data.controlledStop, CompetencyOutcome.D),
          ];
        }),
      ),
      drivingFaults$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          return [
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.DF),
            ...getDrivingFaults(data.drivingFaults),
            ...getVehicleCheckDrivingFault(data.vehicleChecks).map(
              (result: string): MultiFaultAssignableCompetency => ({
                faultCount: 1,
                competencyDisplayName: result,
                competencyIdentifier: result,
              }),
            ),
            ...getControlledStopFault(data.controlledStop, CompetencyOutcome.DF).map(
              (result: string): MultiFaultAssignableCompetency => ({
                faultCount: 1,
                competencyDisplayName: result,
                competencyIdentifier: result,
              }),
            ),
          ];
        }),
      ),
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(getDrivingFaultSummaryCount),
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
      practiceTest$: this.store$.pipe(
        select(getTests),
        select(isTestReportPracticeTest),
      ),
      welshTest$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(isWelshTest),
      ),
    };

    const { testResult$, practiceTest$, welshTest$, etaFaults$, ecoFaults$ } = this.pageState;

    const merged$ = merge(
      testResult$.pipe(map(result => this.outcome = result)),
      practiceTest$.pipe(map(value => this.isPracticeTest = value)),
      welshTest$.pipe(map(isWelsh => this.configureI18N(isWelsh))),
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
    );

    this.subscription = merged$.subscribe();
  }

  configureI18N(isWelsh: boolean): void {
    if (isWelsh) {
      this.translate.use('cy');
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.translate.use(this.translate.getDefaultLang());
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new DebriefViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.isPracticeTest) {
      if (super.isIos()) {
        this.screenOrientation.unlock();
        this.insomnia.allowSleepAgain();
      }
    }
  }

  endDebrief(): void {
    if (this.isPracticeTest) {
      this.navController.popToRoot();
      return;
    }
    this.store$.dispatch(new EndDebrief());
    if (this.outcome === 'Pass') {
      this.navController.push('PassFinalisationPage');
      return;
    }
    this.navController.push('BackToOfficePage');
  }

}
