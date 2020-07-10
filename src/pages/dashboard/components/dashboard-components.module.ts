import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { GoToJournalCardComponent } from './go-to-journal-card/go-to-journal-card';
import { PracticeTestModalModule } from './practice-test-modal/practice-test-modal.module';
import { TestResultsSearchCardComponent } from './test-results-search-card/test-results-search-card';
import { RekeySearchCardComponent } from './rekey-search-card/rekey-search-card';
import { ProfileHeaderComponent } from './profile-header/profile-header';
import { PracticeTestReportCardComponent } from './practice-test-report-card/practice-test-report-card';
import { PracticeEndToEndCardComponent } from './practice-end-to-end-card/practice-end-to-end-card';
import { StartDelegatedExaminerRekeyComponent } from './start-delegated-examiner-rekey/start-delegated-examiner-rekey';

@NgModule({
  declarations: [
    TestResultsSearchCardComponent,
    RekeySearchCardComponent,
    GoToJournalCardComponent,
    ProfileHeaderComponent,
    PracticeTestReportCardComponent,
    PracticeEndToEndCardComponent,
    StartDelegatedExaminerRekeyComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PracticeTestModalModule,
  ],
  exports: [
    TestResultsSearchCardComponent,
    RekeySearchCardComponent,
    GoToJournalCardComponent,
    ProfileHeaderComponent,
    PracticeTestReportCardComponent,
    PracticeEndToEndCardComponent,
    StartDelegatedExaminerRekeyComponent,
  ],
})
export class DashboardComponentsModule { }
