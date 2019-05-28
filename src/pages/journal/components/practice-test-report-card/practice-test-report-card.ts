import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, Modal } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartTestReportPracticeTest } from '../../../../modules/tests/tests.actions';
import { TellMeQuestionDrivingFault, TellMeQuestionCorrect }
  from '../../../../modules/tests/test-data/test-data.actions';
import { ModalEvent } from '../practice-test-modal/practice-test-modal.constants';
import { testReportPracticeModeSlot } from '../../../../modules/tests/__mocks__/tests.mock';

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

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.FAULT:
        this.store$.dispatch(new StartTestReportPracticeTest(this.slotId));
        this.store$.dispatch(new TellMeQuestionDrivingFault());
        this.navController.push('TestReportPage');
        break;
      case ModalEvent.NO_FAULT:
        this.store$.dispatch(new StartTestReportPracticeTest(this.slotId));
        this.store$.dispatch(new TellMeQuestionCorrect());
        this.navController.push('TestReportPage');
        break;
      case ModalEvent.CANCEL:
        break;
    }
  }

}
