import { Component, Input } from '@angular/core';
import { ModalController, Modal, NavController } from 'ionic-angular';
import { CAT_BE, CAT_B, CAT_C } from '../../../pages/page-names.constants';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

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
    switch (this.category) {
      case TestCategory.BE:
        this.navController.push(CAT_BE.DEBRIEF_PAGE);
        break;
      case TestCategory.B:
        this.navController.push(CAT_B.DEBRIEF_PAGE);
        break;
      case TestCategory.C:
        this.navController.push(CAT_C.DEBRIEF_PAGE);
        break;
    }
  }
}
