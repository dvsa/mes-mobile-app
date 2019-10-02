import { Component } from '@angular/core';
import { ModalController, Modal, NavController } from 'ionic-angular';
import { CAT_B } from '../../../pages/page-names.constants';

@Component({
  selector: 'end-test-link',
  templateUrl: 'end-test-link.html',
})
export class EndTestLinkComponent {
  constructor(
    public modalController: ModalController,
    public navController: NavController,
  ) { }

  terminateTestModal: Modal;

  openEndTestModal() {
    this.terminateTestModal = this.modalController.create('TerminateTestModal', {
      onCancel: this.onCancel,
      onTerminate: this.onTerminate,
    }, { cssClass: 'mes-modal-alert text-zoom-regular' });
    this.terminateTestModal.present();
  }

  onCancel = () => {
    this.terminateTestModal.dismiss();
  }

  onTerminate = () => {
    this.terminateTestModal.dismiss();
    this.navController.push(CAT_B.DEBRIEF_PAGE);
  }
}
