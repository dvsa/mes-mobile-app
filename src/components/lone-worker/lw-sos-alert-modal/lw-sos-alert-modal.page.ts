import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Severity, IncidentCore } from '@dvsa/lw-incident-model';
import { StoreModel } from '../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import * as alertActions from '../lw-store/alert/alert.actions';
import { map } from 'rxjs/operators';
import { getAlertStatus, getIncidentProperties } from '../lw-store/alert/alert.selector';
import { Observable, merge, Subscription } from 'rxjs';
import { AlertStatusModel } from '../lw-store/alert/alert.model';
import { getAlertState } from '../lw-store/alert/alert.reducer';

type AlertType = 'red' | 'amber';

@IonicPage()
@Component({
  selector: 'lw-sos-alert-modal',
  templateUrl: 'lw-sos-alert-modal.page.html',
})
export class LWSosAlertModal {

  private subscription: Subscription;
  private merged$: Observable<AlertStatusModel>;

  redAlertStatus$: Observable<AlertStatusModel>;
  amberAlertStatus$: Observable<AlertStatusModel>;
  incidentProperties$: Observable<any>;

  countdownVisible = false;
  countdownValue = 3;
  countdownInterval: any;

  private currentAlertType: AlertType;
  private incident: IncidentCore;

  constructor(
    private navController: NavController,
    private store$: Store<StoreModel>) {}

  ngOnInit(): void {
    this.redAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getAlertStatus(state, Severity.Red)),
    );

    this.amberAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getAlertStatus(state, Severity.Amber)),
    );

    // Might be a better way to extract incident properties outside of this Modal and just do a regular @Input()
    // Would help to decouple Lone Worker with DES
    this.incidentProperties$ = this.store$.pipe(
      select(getIncidentProperties),
      map(incidentProperties => this.incident = incidentProperties as IncidentCore),
    );

    this.merged$ = merge(
      this.redAlertStatus$,
      this.amberAlertStatus$,
      this.incidentProperties$,
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

    this.store$.dispatch(this.currentAlertType === 'red' ?
      new alertActions.SendRedAlert(alert) :
      new alertActions.SendAmberAlert(alert));

  }
}
