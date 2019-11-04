import { Component } from '@angular/core';
import { CAT_BE } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';

@Component({
  selector: 'vehicle-checks-cat-be',
  templateUrl: 'vehicle-checks.html',
})
export class VehicleChecksCatBEComponent {

  constructor(public modalController: ModalController, private app: App) {}

  isInvalid(): boolean {
    // TODO - need to implment validation + unit test
    return false;
  }

  openVehicleChecksModal(): void {
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const modal = this.modalController.create(
      CAT_BE.VEHICLE_CHECKS_MODAL,
      {},
      { cssClass: zoomClass },
    );
    modal.present();
  }
}
