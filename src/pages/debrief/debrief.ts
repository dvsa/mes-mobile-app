import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DebriefViewDidEnter } from '../../pages/debrief/debrief.actions';
import { getCurrentTest, isPracticeTest, getJournalData } from '../../modules/tests/tests.selector';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import {
  getETA,
  getETAFaultText,
  getEco,
  getEcoFaultText,
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
import { PersistTests } from '../../modules/tests/tests.actions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from 'ng2-translate';

interface DebriefPageState {
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<MultiFaultAssignableCompetency[]>;
  drivingFaultCount$: Observable<number>;
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
  testResult$: Observable<string>;
  practiceTest$: Observable<boolean>;
  welshTest$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-debrief',
  templateUrl: 'debrief.html',
})

export class DebriefPage extends BasePageComponent {

  pageState: DebriefPageState;
  subscription: Subscription;

  // Used for now to test displaying pass/fail/terminated messages
  public outcome: string;
  public isPracticeTest: boolean;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    private translate: TranslateService,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    this.pageState = {
      seriousFaults$: currentTest$.pipe(
        select(getTestData),
        map((data) => {
          return [
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.S).map(fault => fault.competencyDisplayName),
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
            ...getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.D).map(fault => fault.competencyDisplayName),
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
        select(getETAFaultText),
      ),
      ecoFaults$: currentTest$.pipe(
        select(getTestData),
        select(getEco),
        select(getEcoFaultText),
      ),
      testResult$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      practiceTest$: this.store$.pipe(
        select(getTests),
        select(isPracticeTest),
      ),
      welshTest$: currentTest$.pipe(
        // TODO: MES-2336 - Get rid of this type generification
        select(getJournalData),
        select((ct: any) => ct.testSlotAttributes),
        select(tsa => tsa.welshTest),
      ),
    };

    const { testResult$, practiceTest$, welshTest$ } = this.pageState;

    const merged$ = merge(
      testResult$.pipe(map(result => this.outcome = result)),
      practiceTest$.pipe(map(value => this.isPracticeTest = value)),
      welshTest$.pipe(map(isWelsh => this.configureI18N(isWelsh))),
    );

    this.subscription = merged$.subscribe();

  }

  configureI18N(isWelsh: boolean): void {
    if (isWelsh) {
      this.translate.use('cy');
    }
  }

  ngOnDestroy(): void {
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
    this.store$.dispatch(new PersistTests());
    if (this.outcome === 'Pass') {
      this.navController.push('PassFinalisationPage');
      return;
    }
    this.navController.push('BackToOfficePage');
  }

}
