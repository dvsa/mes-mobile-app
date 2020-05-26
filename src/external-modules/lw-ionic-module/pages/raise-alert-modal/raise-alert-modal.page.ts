import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Severity, IncidentCore } from '@dvsa/lw-incident-model';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import * as alertActions from '../../store/raised-alert/raised-alert.actions';
import { map } from 'rxjs/operators';
import { getRaisedAlertStatus } from '../../store/raised-alert/raised-alert.selector';
import { Observable, merge, Subscription } from 'rxjs';
import { RaisedAlertStatusModel } from '../../store/raised-alert/raised-alert.model';
import { getAlertState } from '../../store/raised-alert/raised-alert.reducer';
import { LocationProvider } from '../../providers/location.provider';

type AlertType = 'red' | 'amber';

@IonicPage()
@Component({
  selector: 'lw-raise-alert-modal',
  templateUrl: 'raise-alert-modal.page.html',
})
export class RaiseAlertModalPage {

  private subscription: Subscription;
  private merged$: Observable<RaisedAlertStatusModel>;

  redAlertStatus$: Observable<RaisedAlertStatusModel>;
  amberAlertStatus$: Observable<RaisedAlertStatusModel>;

  countdownVisible = false;
  countdownValue = 3;
  countdownInterval: any;

  private currentAlertType: AlertType;
  private incident: IncidentCore;

  constructor(
    private navController: NavController,
    private store$: Store<StoreModel>,
    private locationProvider: LocationProvider,
    private params: NavParams) { }

  ngOnInit(): void {
    this.redAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getRaisedAlertStatus(state, Severity.Red)),
    );

    this.amberAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getRaisedAlertStatus(state, Severity.Amber)),
    );

    this.incident = this.params.get('incident');

    this.merged$ = merge(
      this.redAlertStatus$,
      this.amberAlertStatus$,
    );
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
    return true;
  }

  ionViewWillLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close(): void {
    this.navController.pop();
  }

  startCountDown(type: AlertType): void {
    this.currentAlertType = type;

    this.countdownVisible = true;
    this.countdownInterval = setInterval(() => {
      this.countdownValue = this.countdownValue - 1;

      if (this.countdownValue === 0) {
        clearInterval(this.countdownInterval);
        this.dispatchTriggerAlert();
        this.countdownVisible = false;
        this.countdownValue = 3;
      }
    }, 1000);
  }

  stopCountDown(): void {

    clearInterval(this.countdownInterval);
    this.countdownVisible = false;
    this.countdownValue = 3;
  }

  getCountdownClass(): string {

    if (!this.countdownVisible) {
      return 'lw-countdown-bands';
    }

    return `lw-countdown-bands ${this.currentAlertType} c${this.countdownValue}`;
  }

  private dispatchTriggerAlert(): void {

    const alert: IncidentCore = {
      ...this.incident,
      severity: this.currentAlertType === 'red' ? Severity.Red : Severity.Amber,
      timestamp: new Date(),
    };

    this.locationProvider.tryGetCurrentLocation().
      then((coords) => {
        alert.currentLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp: new Date(),
        };

        this.dispatchAlertAction(alert);
      })
      .catch((err) => {
        console.log(err.permissionDenied ?
          'User has disallowed location sharing' :
          `Device unable to get geolocation: ${err.message}`);
        this.dispatchAlertAction(alert);
      });

  }

  private dispatchAlertAction(alert: IncidentCore): void {

    this.store$.dispatch(this.currentAlertType === 'red' ?
      new alertActions.SendRedAlert(alert) :
      new alertActions.SendAmberAlert(alert));

  }
}
