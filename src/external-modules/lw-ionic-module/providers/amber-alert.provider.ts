import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreModel } from '../store/store.model';
import { Store, select } from '@ngrx/store';
import {
  SubscribeToAmberAlerts,
  UnsubscribeFromAmberAlerts,
  ViewIncidentRequested,
  AmberIncidentDismissed,
} from '../store/amber-alert/amber-alert.actions';
import { map, debounceTime } from 'rxjs/operators';
import { ToastController, Toast, AlertController, Alert } from 'ionic-angular';
import { Subscription, combineLatest } from 'rxjs';
import { getAmberIncidents, getAmberModalState } from '../store/amber-alert/amber-alert.selector';
import { ReceivedIncident } from '../store/amber-alert/amber-alert.model';
import { get } from 'lodash';

@Injectable()
export class AmberAlertProvider {

  public storeSubscription: Subscription;
  private toast: Toast;

  constructor(
    private store$: Store<StoreModel>,
    private toastController: ToastController,
    private alertController: AlertController,
    private datePipe: DatePipe) { }

  subscribe(testCentreId: string): void {

    this.store$.dispatch(new SubscribeToAmberAlerts(testCentreId));

    this.storeSubscription = combineLatest(
      this.store$.pipe(
        select(getAmberIncidents)),
      this.store$.pipe(
        select(getAmberModalState),
      )).pipe(
        debounceTime(500),
        map(([incidents, modalOpen]) => this.checkAndDisplayToast(incidents, modalOpen)),
      ).subscribe();
  }

  unsubscribe(): void {
    this.store$.dispatch(new UnsubscribeFromAmberAlerts());
    this.storeSubscription.unsubscribe();
    if (this.toast) {
      this.toast.dismiss(undefined, 'automatic');
    }
  }

  async checkAndDisplayToast(incidents: ReceivedIncident[], modalOpen: boolean): Promise<void> {

    // if every incident has been dismissed or the modal is open, don't show a new toast
    if (incidents.every(i => i.dismissed) || modalOpen) {
      if (this.toast) {
        this.toast.dismiss(undefined, 'automatic');
      }
      return;
    }

    if (this.toast) { return; }

    this.toast = this.toastController.create({
      message: 'An incident has been raised by a colleague',
      position: 'top',
      cssClass: 'lw-amber-toast',
      showCloseButton: true,
      closeButtonText: 'View Details',
    });

    this.toast.onDidDismiss((data, role) => {
      this.toast = null;
      if (role !== 'automatic') {
        this.store$.dispatch(new ViewIncidentRequested());
      }
    });

    this.toast.present();
  }

  private alert: Alert;
  displayIncident(incident: ReceivedIncident): void {
    if (this.alert) { this.alert.dismiss(); }

    /* tslint:disable:prefer-template */
    /* tslint:disable:max-line-length */
    this.alert = this.alertController.create({
      title: 'Incident details',
      cssClass: 'lw-amber-alert-alert',
      message: '<ul>' +
        '<li>' +
          '<label>Date: </label>' + this.datePipe.transform(incident.timestamp, 'short') +
        '</li>' +
        '<li>' +
          '<label>Staff number: </label>' + incident.loneWorker.staffNumber +
        '</li>' +
        '<li>' +
          '<label>Candidate name: </label>' + get(incident, 'scenario.drivingTestInfo.candidateName', '') +
        '</li>' +
        '<li>' +
          '<label>Test category: </label>' + get(incident, 'scenario.drivingTestInfo.testCategory', '') +
        '</li>' +
        '<li>' +
          '<label>Accompanied by: </label>' + get(incident, 'scenario.drivingTestInfo.accompaniedBy', 'none') +
        '</li>' +
        '<li>' +
          '<label>Vehicle registration: </label>' + get(incident, 'scenario.drivingTestInfo.vehicle.vehicleRegistration', '') +
        '</li>' +
        '<li>' +
          '<label>Dual control: </label>' + (get(incident, 'scenario.drivingTestInfo.vehicle.dualControl', '') ? 'Yes' : 'No') +
        '</li>' +
        '<li>' +
          '<label>School car: </label>' + (get(incident, 'scenario.drivingTestInfo.vehicle.schoolCar', '') ? 'Yes' : 'No') +
        '</li>' +
      '</ul>'
      ,
      buttons: ['Close'],
    });

    this.alert.onDidDismiss(() => {
      this.alert = null;
      this.store$.dispatch(new AmberIncidentDismissed());
    });

    this.alert.present();
  }
  /* tslint:enable:max-line-length */
  /* tslint:enable:prefer-template */
}
