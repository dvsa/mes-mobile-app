import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DebriefViewDidEnter } from '../../pages/debrief/debrief.actions';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestData } from '../../modules/tests/test_data/test-data.reducer';
import { getETAVerbal, getETAPhysical, getETA } from '../../modules/tests/test_data/test-data.selector';
import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { getSeriousOrDangerousFaults, getDrivingFaults } from './debrief.selector';
import { FaultCount } from '../../shared/constants/competencies/catb-competencies';

interface DebriefPageState {
  seriousFaults$: Observable<string[]>;
  dangerousFaults$: Observable<string[]>;
  drivingFaults$: Observable<FaultCount[]>;
  drivingFaultCount$: Observable<number>;
  etaVerbal$: Observable<boolean>;
  etaPhysical$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-debrief',
  templateUrl: 'debrief.html',
})

export class DebriefPage extends BasePageComponent {

  pageState: DebriefPageState;
  subscription: Subscription;

  // Used for now to test displaying pass/fail ngIf messages
  public passed: boolean = true;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.passed = this.navParams.get('outcome') === 'pass';

  }

  ngOnInit(): void {
    this.pageState = {
      seriousFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        map(data => getSeriousOrDangerousFaults(data.seriousFaults)),
      ),
      dangerousFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        map(data => getSeriousOrDangerousFaults(data.dangerousFaults)),
      ),
      drivingFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        map(data => getDrivingFaults(data.drivingFaults)),
      ),
      drivingFaultCount$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        map((data) => {
          const faults = getDrivingFaults(data.drivingFaults);
          return faults.reduce((sum, c) => sum + c.count, 0);
        }),
      ),
      etaPhysical$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getETA),
        select(getETAPhysical),
      ),
      etaVerbal$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getETA),
        select(getETAVerbal),
      ),

    };

    const { seriousFaults$, dangerousFaults$, drivingFaults$, etaPhysical$, etaVerbal$ } = this.pageState;

    const merged$ = merge(
      seriousFaults$,
      dangerousFaults$,
      drivingFaults$,
      etaPhysical$,
      etaVerbal$,
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
    if (this.passed) {
      this.navController.push('PassFinalisationPage');
      return;
    }
    this.navController.push('BackToOfficePage');
  }

}
