import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'end-test-link',
  templateUrl: 'end-test-link.html',
})
export class EndTestLinkComponent {
  constructor(public modalController: ModalController) {}

  openEndTestModal() {
    const terminateTestModal = this.modalController.create(
        'TerminateTestPage',
    );
    terminateTestModal.present();
  }
}
