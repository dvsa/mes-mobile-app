import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalRequirementsModal } from './legal-requirements-modal';
import { ModalAlertTitleComponent } from '../modal-alert-title/modal-alert-title';
import { ModalReturnButtonComponent } from '../modal-return-button/modal-return-button';

@NgModule({
  declarations: [
    LegalRequirementsModal,
    ModalAlertTitleComponent,
    ModalReturnButtonComponent,
  ],
  imports: [
    IonicPageModule.forChild(LegalRequirementsModal),
  ],
  exports: [
    LegalRequirementsModal,
  ],
})
export class LegalRequirementsModalModule { }
