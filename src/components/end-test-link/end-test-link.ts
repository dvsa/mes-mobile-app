import { Component } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';

@Component({
  selector: 'end-test-link',
  templateUrl: 'end-test-link.html',
})
export class EndTestLinkComponent {
  constructor(public modalController: ModalController) { }

  terminateTestModal: Modal;

  openEndTestModal() {
    this.terminateTestModal = this.modalController.create('TerminateTestModal', {
      onCancel: this.onCancel,
    });
    this.terminateTestModal.present();
  }

  onCancel = () => {
    this.terminateTestModal.dismiss();
  }
}
