import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Incident, Severity } from '@dvsa/lw-incident-model';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';
import * as alertActions from '../lw-store/alert/alert.actions';

type AlertType = 'red' | 'amber';

@IonicPage()
@Component({
  selector: 'lw-sos-alert-modal',
  templateUrl: 'lw-sos-alert-modal.page.html',
})
export class LWSosAlertModal {

  countdownVisible = false;
  countdownValue = 3;
  countdownInterval: any;

  private currentAlertType: AlertType;
  private incident: Incident;

  constructor(
    private navController: NavController,
    private store$: Store<StoreModel>) {}

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
        this.triggerAlert();
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

  private triggerAlert(): void {

    console.log('constructing incident');

    const alert: Incident = {
      ...this.incident,
      severity: this.currentAlertType === 'red' ? Severity.Red : Severity.Amber,
      timestamp: new Date(),
    };

    console.log('dispatching relevant actions considering the incident');

    this.store$.dispatch(this.currentAlertType === 'red' ?
      new alertActions.SendRedAlert(alert) :
      new alertActions.SendAmberAlert(alert));

  }
}
