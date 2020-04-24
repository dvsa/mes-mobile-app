import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'lw-sos-button',
  templateUrl: 'lw-sos-button.html',
})
export class LWSosButtonComponent {

  constructor(private modalController: ModalController) { }

  status = {};

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
