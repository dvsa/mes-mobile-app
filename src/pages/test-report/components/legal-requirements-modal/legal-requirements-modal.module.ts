import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalRequirementsModal } from './legal-requirements-modal';
import { TestReportModalModule } from '../test-report-modal/test-report-modal.module';

@NgModule({
  declarations: [
    LegalRequirementsModal,
  ],
  imports: [
    IonicPageModule.forChild(LegalRequirementsModal),
    TestReportModalModule,
  ],
  exports: [
    LegalRequirementsModal,
  ],
})
export class LegalRequirementsModalModule { }
