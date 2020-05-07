import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { Observable } from 'rxjs';
import { AlertStatusModel } from '../lw-store/alert/alert.model';
import { map } from 'rxjs/operators';
import { getAlertStatus } from '../lw-store/alert/alert.selector';
import { Severity } from '@dvsa/lw-incident-model';
import { getAlertState } from '../lw-store/alert/alert.reducer';

@Component({
  selector: 'lw-sos-button',
  templateUrl: 'lw-sos-button.html',
})
export class LWSosButtonComponent {

  redAlertStatus$: Observable<AlertStatusModel>;
  amberAlertStatus$: Observable<AlertStatusModel>;

  constructor(
    private modalController: ModalController,
    private store$: Store<StoreModel>) { }

  // TODO: Retrieve statuses from store
  status = {};

  ngOnInit(): void {
    this.redAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getAlertStatus(state, Severity.Red)),
    );

    this.amberAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getAlertStatus(state, Severity.Amber)),
    );
  }

  raiseSos(): void {
    const modalName = 'LWSosAlertModal';

    const modal = this.modalController.create(
      modalName,
      {},
      { cssClass: 'modal-fullscreen' });

    modal.onDidDismiss(() => {
      console.log('Sos Alert Modal dismissed');
    });

    modal.present();
  }

  getStatusClass = () => {};
}
