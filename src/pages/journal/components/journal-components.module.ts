import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ActivitySlotComponent } from '../components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../components/empty-slot/empty-slot';
import { JournalNavigationComponent } from '../components/journal-navigation/journal-navigation';
import { PracticeTestReportCardComponent } from './practice-test-report-card/practice-test-report-card';
import { PracticeTestModalModule } from './practice-test-modal/practice-test-modal.module';
import { PracticeEndToEndCardComponent } from './practice-end-to-end-card/practice-end-to-end-card';
import { TestResultsSearchCardComponent } from './test-results-search-card/test-results-search-card';
import { RekeySearchCardComponent } from './rekey-search-card/rekey-search-card';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { PersonalCommitmentSlotComponent } from '../personal-commitment/personal-commitment';

@NgModule({
  declarations: [
    ActivitySlotComponent,
    EmptySlotComponent,
    JournalNavigationComponent,
    PracticeTestReportCardComponent,
    PracticeEndToEndCardComponent,
    TestResultsSearchCardComponent,
    RekeySearchCardComponent,
    PersonalCommitmentSlotComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PracticeTestModalModule,
    TestSlotComponentsModule,
  ],
  entryComponents: [
    PersonalCommitmentSlotComponent,
  ],
  exports: [
    ActivitySlotComponent,
    EmptySlotComponent,
    JournalNavigationComponent,
    PracticeTestReportCardComponent,
    PracticeEndToEndCardComponent,
    TestResultsSearchCardComponent,
    RekeySearchCardComponent,
    PersonalCommitmentSlotComponent,
  ],
})
export class JournalComponentsModule { }
