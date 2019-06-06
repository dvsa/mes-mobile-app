import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalRequirementsModal } from './legal-requirements-modal';
import { ModalAlertTitleComponent } from '../modal-alert-title/modal-alert-title';

@NgModule({
  declarations: [
    LegalRequirementsModal,
    ModalAlertTitleComponent,
  ],
  imports: [
    IonicPageModule.forChild(LegalRequirementsModal),
  ],
  exports: [
    LegalRequirementsModal,
  ],
})
export class LegalRequirementsModalModule { }
