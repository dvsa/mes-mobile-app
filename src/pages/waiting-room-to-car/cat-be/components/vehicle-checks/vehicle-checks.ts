import { Component, Input } from '@angular/core';
import { CAT_BE } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { VehicleChecksScore } from '../../../../../providers/question/vehicle-checks-score.model';

@Component({
  selector: 'vehicle-checks-cat-be',
  templateUrl: 'vehicle-checks.html',
})
export class VehicleChecksCatBEComponent {

  @Input() public vehicleChecksScore: VehicleChecksScore;

  constructor(public modalController: ModalController, private app: App) {
    console.log(this.vehicleChecksScore);
  }

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
