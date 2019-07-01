import { JournalRekeyModal } from './journal-rekey-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReportModalModule } from '../../test-report/components/test-report-modal/test-report-modal.module';

@NgModule({
  declarations: [
    JournalRekeyModal,
  ],
  imports: [
    IonicPageModule.forChild(JournalRekeyModal),
    TestReportModalModule,
  ],
  exports: [
    JournalRekeyModal,
  ],
})
export class JournalRekeyModalModule { }
