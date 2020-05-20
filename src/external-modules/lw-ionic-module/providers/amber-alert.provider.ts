import { Injectable } from '@angular/core';
import { StoreModel } from '../store/store.model';
import { Store, select } from '@ngrx/store';
import {
  SubscribeToAmberAlerts,
  UnsubscribeFromAmberAlerts,
  ViewIncidentRequested,
  AmberIncidentDismissed,
} from '../store/amber-alert/amber-alert.actions';
import { map, debounceTime } from 'rxjs/operators';
import { ToastController, ModalController, Modal, Toast } from 'ionic-angular';
import { Subscription, combineLatest } from 'rxjs';
import { getAmberIncidents, getAmberModalState } from '../store/amber-alert/amber-alert.selector';
import { ReceivedIncident } from '../store/amber-alert/amber-alert.model';

@Injectable()
export class AmberAlertProvider {

  public storeSubscription: Subscription;
  private toast: Toast;

  constructor(
    private store$: Store<StoreModel>,
    private toastController: ToastController,
    private modelController: ModalController) { }

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

  private modal: Modal;
  displayIncident(incident: ReceivedIncident): void {
    if (this.modal) { this.modal.dismiss(); }

    this.modal = this.modelController.create(
      'AmberAlertModalPage',
      { incident },
      {
        cssClass: 'lw-amber-alert-modal',
        enableBackdropDismiss: false,
      });

    this.modal.onDidDismiss(() => {
      this.modal = null;
      this.store$.dispatch(new AmberIncidentDismissed());
    });

    this.modal.present();
  }
}
