import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';

import { HelpWaitingRoomToCarPage } from './../help-waiting-room-to-car/help-waiting-room-to-car';
import { HelpTestReportPage } from './../help-test-report/help-test-report';
import { HelpJournalPage } from './../help-journal/help-journal';
import { HelpFinalisationSubmissionPage } from './../help-finalisation-submission/help-finalisation-submission';
import { HelpDebriefPage } from './../help-debrief/help-debrief';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logging: AnalyticsProvider
  ) {}

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.HELP_GUIDE);
  }

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

  isJournalVisibilityExpanded() {
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
    if (this.isJournalVisibilityExpanded()) {
      this.visibility.journal = visibilityType.collapsed;
      return;
    }
  }

  journalSectionNumberClass() {
    if (this.isJournalVisibilityCollapsed()) return 'gray-section-number';
    if (this.isJournalVisibilityExpanded()) return 'black-section-number';
  }

  journalSectionItemClass() {
    if (this.isJournalVisibilityCollapsed()) return 'gray-section-item';
    if (this.isJournalVisibilityExpanded()) return 'black-section-item';
  }

  // Expanding and collapsing Waiting Room to Car section

  isWaitingRoomToCarVisibilityExpanded() {
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
    if (this.isWaitingRoomToCarVisibilityExpanded()) {
      this.visibility.waitingRoomToCar = visibilityType.collapsed;
      return;
    }
  }

  waitingRoomToCarSectionNumberClass() {
    if (this.isWaitingRoomToCarVisibilityCollapsed()) return 'gray-section-number';
    if (this.isWaitingRoomToCarVisibilityExpanded()) return 'black-section-number';
  }

  waitingRoomToCarSectionItemClass() {
    if (this.isWaitingRoomToCarVisibilityCollapsed()) return 'gray-section-item';
    if (this.isWaitingRoomToCarVisibilityExpanded()) return 'black-section-item';
  }

  // Expanding and collapsing In-car Testing section

  isInCarTestingVisibilityExpanded() {
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
    if (this.isInCarTestingVisibilityExpanded()) {
      this.visibility.inCarTesting = visibilityType.collapsed;
      return;
    }
  }

  inCarTestingSectionNumberClass() {
    if (this.isInCarTestingVisibilityCollapsed()) return 'gray-section-number';
    if (this.isInCarTestingVisibilityExpanded()) return 'black-section-number';
  }

  inCarTestingSectionItemClass() {
    if (this.isInCarTestingVisibilityCollapsed()) return 'gray-section-item';
    if (this.isInCarTestingVisibilityExpanded()) return 'black-section-item';
  }

  // Expanding and collapsing Debrief section

  isDebreifVisibilityExpanded() {
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
    if (this.isDebreifVisibilityExpanded()) {
      this.visibility.debreif = visibilityType.collapsed;
      return;
    }
  }

  debreifSectionNumberClass() {
    if (this.isDebreifVisibilityCollapsed()) return 'gray-section-number';
    if (this.isDebreifVisibilityExpanded()) return 'black-section-number';
  }

  debreifSectionItemClass() {
    if (this.isDebreifVisibilityCollapsed()) return 'gray-section-item';
    if (this.isDebreifVisibilityExpanded()) return 'black-section-item';
  }

  // Expanding and collapsing Finalisation and Submission section

  isFinalisationAndSubmissionVisibilityExpanded() {
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
    if (this.isFinalisationAndSubmissionVisibilityExpanded()) {
      this.visibility.finalisationAndSubmission = visibilityType.collapsed;
      return;
    }
  }

  finalisationAndSubmissionSectionNumberClass() {
    if (this.isFinalisationAndSubmissionVisibilityCollapsed()) return 'gray-section-number';
    if (this.isFinalisationAndSubmissionVisibilityExpanded()) return 'black-section-number';
  }

  finalisationAndSubmissionSectionItemClass() {
    if (this.isFinalisationAndSubmissionVisibilityCollapsed()) return 'gray-section-item';
    if (this.isFinalisationAndSubmissionVisibilityExpanded()) return 'black-section-item';
  }
}
