import { HelpWaitingRoomToCarPage } from './../help-waiting-room-to-car/help-waiting-room-to-car';
import { HelpTestReportPage } from './../help-test-report/help-test-report';
import { HelpJournalPage } from './../help-journal/help-journal';
import { HelpFinalisationSubmissionPage } from './../help-finalisation-submission/help-finalisation-submission';
import { HelpDebriefPage } from './../help-debrief/help-debrief';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';

@Component({
  selector: 'page-help-section',
  templateUrl: 'help-section.html'
})
export class HelpSectionPage {
  title: 'Help';
  helpDebriefPage: Page = HelpDebriefPage;
  helpFinalisationSubmissionPage: Page = HelpFinalisationSubmissionPage;
  helpJournalPage: Page = HelpJournalPage;
  helpTestReportPage: Page = HelpTestReportPage;
  helpWaitingRoomToCarPage: Page = HelpWaitingRoomToCarPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
