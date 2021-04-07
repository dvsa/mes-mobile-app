import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, Modal } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartTestReportPracticeTest } from '../../../../modules/tests/tests.actions';
import { TellMeQuestionDrivingFault, TellMeQuestionCorrect }
  from '../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { ModalEvent } from '../practice-test-modal/practice-test-modal.constants';
import { testReportPracticeModeSlot } from '../../../../modules/tests/__mocks__/tests.mock';
import { CAT_B } from '../../../page-names.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Component({
  selector: 'practice-test-report-card',
  templateUrl: 'practice-test-report-card.html',
})

export class PracticeTestReportCardComponent {

  slotId: string = testReportPracticeModeSlot.slotDetail.slotId;
  modal: Modal;

  constructor(
    private store$: Store<StoreModel>,
    public alertController: AlertController,
    public navController: NavController,
    private modalController: ModalController,
  ) { }

  showDrivingFaultModal = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('PracticeTestModal', {}, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  // TODO - To expand test report practice mode to other categories the navController push needs to be dynamic.
  // TODO - Tell me questions not needed for CatBE
  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.FAULT:
        this.store$.dispatch(new StartTestReportPracticeTest(this.slotId, TestCategory.B));
        this.store$.dispatch(new TellMeQuestionDrivingFault());
        this.navController.push(CAT_B.TEST_REPORT_PAGE);
        break;
      case ModalEvent.NO_FAULT:
        this.store$.dispatch(new StartTestReportPracticeTest(this.slotId, TestCategory.B));
        this.store$.dispatch(new TellMeQuestionCorrect());
        this.navController.push(CAT_B.TEST_REPORT_PAGE);
        break;
      case ModalEvent.CANCEL:
        break;
    }
  }

}
