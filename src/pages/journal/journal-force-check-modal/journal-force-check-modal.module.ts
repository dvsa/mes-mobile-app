import { JournalForceCheckModal } from './journal-force-check-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReportModalModule } from '../../test-report/components/test-report-modal/test-report-modal.module';

@NgModule({
  declarations: [
    JournalForceCheckModal,
  ],
  imports: [
    IonicPageModule.forChild(JournalForceCheckModal),
    TestReportModalModule,
  ],
  exports: [
    JournalForceCheckModal,
  ],
})
export class JournalForceCheckModule { }
