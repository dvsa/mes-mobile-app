import { Component, Input } from '@angular/core';
import { ModalController, Modal, NavController } from 'ionic-angular';
import { CAT_BE, CAT_B } from '../../../pages/page-names.constants';
import { TestCategory } from '../../../shared/models/test-category';

@Component({
  selector: 'end-test-link',
  templateUrl: 'end-test-link.html',
})
export class EndTestLinkComponent {

  @Input()
  category: string;

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
    if (this.category === TestCategory.BE) {
      this.navController.push(CAT_BE.DEBRIEF_PAGE);
    } else {
      this.navController.push(CAT_B.DEBRIEF_PAGE);
    }

  }
}
