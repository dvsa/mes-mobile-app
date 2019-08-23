import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { GoToJournalCardComponent } from './go-to-journal-card/go-to-journal-card';
import { PracticeTestModalModule } from './practice-test-modal/practice-test-modal.module';
import { PracticeTestComponentsModule } from './practice-test-components.module';
import { TestResultsSearchCardComponent } from './test-results-search-card/test-results-search-card';
import { RekeySearchCardComponent } from './rekey-search-card/rekey-search-card';
import { ProfileHeaderComponent } from './profile-header/profile-header';

@NgModule({
  declarations: [
    TestResultsSearchCardComponent,
    RekeySearchCardComponent,
    GoToJournalCardComponent,
    ProfileHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PracticeTestModalModule,
    PracticeTestComponentsModule,
  ],
  exports: [
    PracticeTestComponentsModule,
    TestResultsSearchCardComponent,
    RekeySearchCardComponent,
    GoToJournalCardComponent,
    ProfileHeaderComponent,
  ],
})
export class DashboardComponentsModule { }
