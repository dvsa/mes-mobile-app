import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EtaInvalidModal } from './eta-invalid-modal';
import { TestReportModalModule } from '../test-report-modal/test-report-modal.module';

@NgModule({
  declarations: [
    EtaInvalidModal,
  ],
  imports: [
    IonicPageModule.forChild(EtaInvalidModal),
    TestReportModalModule,
  ],
  exports: [
    EtaInvalidModal,
  ],
})
export class EtaInvalidModalModule { }
