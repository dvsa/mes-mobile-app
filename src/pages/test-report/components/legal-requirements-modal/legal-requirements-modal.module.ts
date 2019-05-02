import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalRequirementsModal } from './legal-requirements-modal';

@NgModule({
  declarations: [
    LegalRequirementsModal,
  ],
  imports: [
    IonicPageModule.forChild(LegalRequirementsModal),
  ],
  exports: [
    LegalRequirementsModal,
  ],
})
export class LegalRequirementsModalModule { }
