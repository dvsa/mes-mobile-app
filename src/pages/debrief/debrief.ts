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
import { getSeriousOrDangerousFaults, getDrivingFaults, getManoeuvreFaults, getTestOutcome } from './debrief.selector';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { MultiFaultAssignableCompetency } from '../../shared/models/fault-marking.model';
import { PersistTests } from '../../modules/tests/tests.actions';

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
  private isPracticeTest: boolean;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
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
