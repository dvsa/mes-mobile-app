import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DebriefViewDidEnter } from '../../pages/debrief/debrief.actions';
import { getCurrentTest, isPracticeTest } from '../../modules/tests/tests.selector';
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

interface DebriefPageState {
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<MultiFaultAssignableCompetency[]>;
  drivingFaultCount$: Observable<number>;
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
  testResult$: Observable<string>;
  practiceTest$: Observable<boolean>;
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
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ngOnInit(): void {
    this.pageState = {
      seriousFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
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
      dangerousFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
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
      drivingFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
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
      drivingFaultCount$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getDrivingFaultSummaryCount),
      ),
      etaFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getETA),
        select(getETAFaultText),
      ),
      ecoFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getEco),
        select(getEcoFaultText),
      ),
      testResult$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestOutcome),
      ),
      practiceTest$: this.store$.pipe(
        select(getTests),
        select(isPracticeTest),
      ),
    };

    const { testResult$, practiceTest$ } = this.pageState;

    const merged$ = merge(
      testResult$.pipe(map(result => this.outcome = result)),
      practiceTest$.pipe(map(value => this.isPracticeTest = value)),
    );

    this.subscription = merged$.subscribe();

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new DebriefViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.isPracticeTest) {
      // this.store$.dispatch(new EndPracticeTest());
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
