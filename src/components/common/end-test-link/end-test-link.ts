import { Component, Input } from '@angular/core';
import { ModalController, Modal, NavController } from 'ionic-angular';
import {
  CAT_BE,
  CAT_B,
  CAT_C,
  CAT_D,
  CAT_A_MOD1,
  CAT_A_MOD2,
  CAT_HOME_TEST,
} from '../../../pages/page-names.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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
      case TestCategory.B:
        this.navController.push(CAT_B.DEBRIEF_PAGE);
        break;
      case TestCategory.BE:
        this.navController.push(CAT_BE.DEBRIEF_PAGE);
        break;
      case TestCategory.C:
        this.navController.push(CAT_C.DEBRIEF_PAGE);
        break;
      case TestCategory.D:
        this.navController.push(CAT_D.DEBRIEF_PAGE);
        break;
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K:
        this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE);
        break;
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAM1:
      case TestCategory.EUAMM1:
        this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
        break;
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAM2:
      case TestCategory.EUAMM2:
        this.navController.push(CAT_A_MOD2.DEBRIEF_PAGE);
        break;
    }
  }
}
