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
import { HelpWaitingRoomPage } from './pages/help-waiting-room/help-waiting-room';
import { HelpPassFinalisationPage } from './pages/help-pass-finalisation/help-pass-finalisation';

@NgModule({
  declarations: [
    HelpCandidateDetailsPage,
    HelpDebriefPage,
    HelpFinalisationSubmissionPage,
    HelpJournalPage,
    HelpPassFinalisationPage,
    HelpSectionPage,
    HelpTestReportPage,
    HelpWaitingRoomPage,
    HelpWaitingRoomToCarPage
  ],
  imports: [IonicModule.forRoot(HelpSectionPage), ComponentsModule, HelpComponentsModule],
  entryComponents: [
    HelpCandidateDetailsPage,
    HelpDebriefPage,
    HelpFinalisationSubmissionPage,
    HelpJournalPage,
    HelpPassFinalisationPage,
    HelpSectionPage,
    HelpTestReportPage,
    HelpWaitingRoomPage,
    HelpWaitingRoomToCarPage
  ],
  exports: [
    HelpCandidateDetailsPage,
    HelpDebriefPage,
    HelpFinalisationSubmissionPage,
    HelpJournalPage,
    HelpPassFinalisationPage,
    HelpSectionPage,
    HelpTestReportPage,
    HelpWaitingRoomPage,
    HelpWaitingRoomToCarPage
  ]
})
export class HelpModule {}
