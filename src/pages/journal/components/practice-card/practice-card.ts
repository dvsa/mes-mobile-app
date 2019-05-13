import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, Modal } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartPracticeTest } from '../../../../modules/tests/tests.actions';
import { TellMeQuestionDrivingFault, TellMeQuestionCorrect }
  from '../../../../modules/tests/test-data/test-data.actions';
import { ModalEvent } from '../practice-test-modal/practice-test-modal.constants';
import { practiceSlot } from '../../../../modules/tests/__mocks__/tests.mock';

@Component({
  selector: 'practice-card',
  templateUrl: 'practice-card.html',
})

export class PracticeCardComponent {

  slotId: string = practiceSlot.slotDetail.slotId;
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
        this.store$.dispatch(new StartPracticeTest(this.slotId));
        this.store$.dispatch(new TellMeQuestionDrivingFault());
        this.navController.push('TestReportPage');
        break;
      case ModalEvent.NO_FAULT:
        this.store$.dispatch(new StartPracticeTest(this.slotId));
        this.store$.dispatch(new TellMeQuestionCorrect());
        this.navController.push('TestReportPage');
        break;
      case ModalEvent.CANCEL:
        break;
    }
  }

}
