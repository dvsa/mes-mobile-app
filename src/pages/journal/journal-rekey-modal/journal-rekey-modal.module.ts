import { JournalRekeyModal } from './journal-rekey-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {
  ModalAlertTitleComponent,
} from '../../test-report/components/test-report-modal/modal-alert-title/modal-alert-title';
import {
  ModalReturnButtonComponent,
} from '../../test-report/components/test-report-modal/modal-return-button/modal-return-button';

@NgModule({
  declarations: [
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
    JournalRekeyModal,
  ],
  imports: [
    IonicPageModule.forChild(JournalRekeyModal),
  ],
  exports: [
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
    JournalRekeyModal,
  ],
})
export class JournalRekeyModalModule { }
