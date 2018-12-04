import { HelpWaitingRoomToCarPage } from './pages/help-waiting-room-to-car/help-waiting-room-to-car';
import { HelpTestReportPage } from './pages/help-test-report/help-test-report';
import { HelpSectionPage } from './pages/help-section/help-section';
import { HelpJournalPage } from './pages/help-journal/help-journal';
import { HelpFinalisationSubmissionPage } from './pages/help-finalisation-submission/help-finalisation-submission';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HelpDebriefPage } from './pages/help-debrief/help-debrief';
import { ComponentsModule } from '../components/components.module';
import { HelpComponentsModule } from './components/components.module';
import { HelpCandidateDetailsPage } from './pages/help-candidate-details/help-candidate-details';

@NgModule({
  declarations: [
    HelpCandidateDetailsPage,
    HelpDebriefPage,
    HelpFinalisationSubmissionPage,
    HelpJournalPage,
    HelpSectionPage,
    HelpTestReportPage,
    HelpWaitingRoomToCarPage
  ],
  imports: [IonicModule.forRoot(HelpSectionPage), ComponentsModule, HelpComponentsModule],
  entryComponents: [
    HelpCandidateDetailsPage,
    HelpDebriefPage,
    HelpFinalisationSubmissionPage,
    HelpJournalPage,
    HelpSectionPage,
    HelpTestReportPage,
    HelpWaitingRoomToCarPage
  ],
  exports: [
    HelpCandidateDetailsPage,
    HelpDebriefPage,
    HelpFinalisationSubmissionPage,
    HelpJournalPage,
    HelpSectionPage,
    HelpTestReportPage,
    HelpWaitingRoomToCarPage
  ]
})
export class HelpModule {}
