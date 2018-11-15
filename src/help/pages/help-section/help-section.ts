import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';

import { HelpWaitingRoomToCarPage } from './../help-waiting-room-to-car/help-waiting-room-to-car';
import { HelpTestReportPage } from './../help-test-report/help-test-report';
import { HelpJournalPage } from './../help-journal/help-journal';
import { HelpFinalisationSubmissionPage } from './../help-finalisation-submission/help-finalisation-submission';
import { HelpDebriefPage } from './../help-debrief/help-debrief';

enum visibilityType {
  collapsed = 'collapsed',
  expanded = 'expanded'
}

@Component({
  selector: 'page-help-section',
  templateUrl: 'help-section.html'
})
export class HelpSectionPage {
  title: string = 'Help guide';

  helpDebriefPage: Page = HelpDebriefPage;
  helpFinalisationSubmissionPage: Page = HelpFinalisationSubmissionPage;
  helpJournalPage: Page = HelpJournalPage;
  helpTestReportPage: Page = HelpTestReportPage;
  helpWaitingRoomToCarPage: Page = HelpWaitingRoomToCarPage;

  // TODO: Define an interface for this
  visibility = {
    journal: visibilityType.expanded,
    waitingRoomToCar: visibilityType.collapsed,
    inCarTesting: visibilityType.collapsed,
    debreif: visibilityType.collapsed,
    finalisationAndSubmission: visibilityType.collapsed
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  isJournalVisibilityExpended() {
    return this.visibility.journal === visibilityType.expanded;
  }

  isJournalVisibilityCollapsed() {
    return this.visibility.journal === visibilityType.collapsed;
  }

  setJournelVisibility(visibility: visibilityType) {
    this.visibility.journal = visibility;
  }
}
