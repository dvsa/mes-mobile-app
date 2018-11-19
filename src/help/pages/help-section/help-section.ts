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

  visibility: IVisibility = {
    journal: visibilityType.expanded,
    waitingRoomToCar: visibilityType.collapsed,
    inCarTesting: visibilityType.collapsed,
    debreif: visibilityType.collapsed,
    finalisationAndSubmission: visibilityType.collapsed
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  // Expanding and collapsing all sections

  isAtLeastOneCollapsed() {
    return Object.keys(this.visibility).some(
      (section) => this.visibility[section] === visibilityType.collapsed
    );
  }

  isAllExpanded() {
    return Object.keys(this.visibility).every(
      (section) => this.visibility[section] === visibilityType.expanded
    );
  }

  expandAll() {
    this.visibility = {
      journal: visibilityType.expanded,
      waitingRoomToCar: visibilityType.expanded,
      inCarTesting: visibilityType.expanded,
      debreif: visibilityType.expanded,
      finalisationAndSubmission: visibilityType.expanded
    };
  }

  collapseAll() {
    this.visibility = {
      journal: visibilityType.collapsed,
      waitingRoomToCar: visibilityType.collapsed,
      inCarTesting: visibilityType.collapsed,
      debreif: visibilityType.collapsed,
      finalisationAndSubmission: visibilityType.collapsed
    };
  }

  // Expanding and collapsing Journal section

  isJournalVisibilityExpended() {
    return this.visibility.journal === visibilityType.expanded;
  }

  isJournalVisibilityCollapsed() {
    return this.visibility.journal === visibilityType.collapsed;
  }

  toggleJournalVisibility() {
    if (this.isJournalVisibilityCollapsed()) {
      this.visibility.journal = visibilityType.expanded;
      return;
    }
    if (this.isJournalVisibilityExpended()) {
      this.visibility.journal = visibilityType.collapsed;
      return;
    }
  }

  journalSectionNumberClass() {
    if (this.isJournalVisibilityCollapsed()) return 'gray-section-number';
    if (this.isJournalVisibilityExpended()) return 'black-section-number';
  }

  journalSectionItemClass() {
    if (this.isJournalVisibilityCollapsed()) return 'gray-section-item';
    if (this.isJournalVisibilityExpended()) return 'black-section-item';
  }

  // Expanding and collapsing Waiting Room to Car section

  isWaitingRoomToCarVisibilityExpended() {
    return this.visibility.waitingRoomToCar === visibilityType.expanded;
  }

  isWaitingRoomToCarVisibilityCollapsed() {
    return this.visibility.waitingRoomToCar === visibilityType.collapsed;
  }

  toggleWaitingRoomToCarVisibility() {
    if (this.isWaitingRoomToCarVisibilityCollapsed()) {
      this.visibility.waitingRoomToCar = visibilityType.expanded;
      return;
    }
    if (this.isWaitingRoomToCarVisibilityExpended()) {
      this.visibility.waitingRoomToCar = visibilityType.collapsed;
      return;
    }
  }

  waitingRoomToCarSectionNumberClass() {
    if (this.isWaitingRoomToCarVisibilityCollapsed()) return 'gray-section-number';
    if (this.isWaitingRoomToCarVisibilityExpended()) return 'black-section-number';
  }

  waitingRoomToCarSectionItemClass() {
    if (this.isWaitingRoomToCarVisibilityCollapsed()) return 'gray-section-item';
    if (this.isWaitingRoomToCarVisibilityExpended()) return 'black-section-item';
  }

  // Expanding and collapsing In-car Testing section

  isInCarTestingVisibilityExpended() {
    return this.visibility.inCarTesting === visibilityType.expanded;
  }

  isInCarTestingVisibilityCollapsed() {
    return this.visibility.inCarTesting === visibilityType.collapsed;
  }

  toggleInCarTestingVisibility() {
    if (this.isInCarTestingVisibilityCollapsed()) {
      this.visibility.inCarTesting = visibilityType.expanded;
      return;
    }
    if (this.isInCarTestingVisibilityExpended()) {
      this.visibility.inCarTesting = visibilityType.collapsed;
      return;
    }
  }

  inCarTestingSectionNumberClass() {
    if (this.isInCarTestingVisibilityCollapsed()) return 'gray-section-number';
    if (this.isInCarTestingVisibilityExpended()) return 'black-section-number';
  }

  inCarTestingSectionItemClass() {
    if (this.isInCarTestingVisibilityCollapsed()) return 'gray-section-item';
    if (this.isInCarTestingVisibilityExpended()) return 'black-section-item';
  }

  // Expanding and collapsing Debrief section

  isDebreifVisibilityExpended() {
    return this.visibility.debreif === visibilityType.expanded;
  }

  isDebreifVisibilityCollapsed() {
    return this.visibility.debreif === visibilityType.collapsed;
  }

  toggleDebreifVisibility() {
    if (this.isDebreifVisibilityCollapsed()) {
      this.visibility.debreif = visibilityType.expanded;
      return;
    }
    if (this.isDebreifVisibilityExpended()) {
      this.visibility.debreif = visibilityType.collapsed;
      return;
    }
  }

  debreifSectionNumberClass() {
    if (this.isDebreifVisibilityCollapsed()) return 'gray-section-number';
    if (this.isDebreifVisibilityExpended()) return 'black-section-number';
  }

  debreifSectionItemClass() {
    if (this.isDebreifVisibilityCollapsed()) return 'gray-section-item';
    if (this.isDebreifVisibilityExpended()) return 'black-section-item';
  }

  // Expanding and collapsing Finalisation and Submission section

  isFinalisationAndSubmissionVisibilityExpended() {
    return this.visibility.finalisationAndSubmission === visibilityType.expanded;
  }

  isFinalisationAndSubmissionVisibilityCollapsed() {
    return this.visibility.finalisationAndSubmission === visibilityType.collapsed;
  }

  toggleFinalisationAndSubmissionVisibility() {
    if (this.isFinalisationAndSubmissionVisibilityCollapsed()) {
      this.visibility.finalisationAndSubmission = visibilityType.expanded;
      return;
    }
    if (this.isFinalisationAndSubmissionVisibilityExpended()) {
      this.visibility.finalisationAndSubmission = visibilityType.collapsed;
      return;
    }
  }

  finalisationAndSubmissionSectionNumberClass() {
    if (this.isFinalisationAndSubmissionVisibilityCollapsed()) return 'gray-section-number';
    if (this.isFinalisationAndSubmissionVisibilityExpended()) return 'black-section-number';
  }

  finalisationAndSubmissionSectionItemClass() {
    if (this.isFinalisationAndSubmissionVisibilityCollapsed()) return 'gray-section-item';
    if (this.isFinalisationAndSubmissionVisibilityExpended()) return 'black-section-item';
  }
}
