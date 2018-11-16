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

interface IVisibility {
  journal: visibilityType;
  waitingRoomToCar: visibilityType;
  inCarTesting: visibilityType;
  debreif: visibilityType;
  finalisationAndSubmission: visibilityType;
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
  visibility: IVisibility = {
    journal: visibilityType.expanded,
    waitingRoomToCar: visibilityType.collapsed,
    inCarTesting: visibilityType.collapsed,
    debreif: visibilityType.collapsed,
    finalisationAndSubmission: visibilityType.collapsed
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  // Expanding and collapsing Journal section

  isJournalVisibilityExpended() {
    return this.visibility.journal === visibilityType.expanded;
  }

  isJournalVisibilityCollapsed() {
    return this.visibility.journal === visibilityType.collapsed;
  }

  toggleJournelVisibility() {
    if (this.isJournalVisibilityCollapsed()) {
      this.visibility.journal = visibilityType.expanded;
      return;
    }
    if (this.isJournalVisibilityExpended()) {
      this.visibility.journal = visibilityType.collapsed;
      return;
    }
  }

  // Expanding and collapsing Waiting Room to Car section

  // Expanding and collapsing In-car Testing section

  // Expanding and collapsing Debrief section

  // Expanding and collapsing Finalisation and Submission section
}
