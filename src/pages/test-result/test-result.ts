import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';

import { PostTestSummaryPage } from '../post-test-summary/post-test-summary';
import { HelpDebriefPage } from '../../help/pages/help-debrief/help-debrief';

import { IFaultSummary } from '../../components/test-summary/interfaces/IFaultSummary';
import { TestResult } from '../../components/test-summary/enums/TestResult';

import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';

import { PassDataCollectionPage } from '../pass-data-collection/pass-data-collection';
import { IJournal, ICandidateName } from '../../providers/journal/journal-model';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@Component({
  selector: 'page-test-result',
  templateUrl: 'test-result.html'
})
export class TestResultPage {
  postTestSummaryPage: Page = PostTestSummaryPage;
  passDataCollectionPage: Page = PassDataCollectionPage;
  helpPage: Page = HelpDebriefPage;
  testResult: string;
  faultSummaries: {
    [key: string]: IFaultSummary;
  };
  summaryMetadata: any;

  slotDetail: IJournal;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faultStore: FaultStoreProvider,
    private summaryMetadataService: TestSummaryMetadataProvider,
    public logging: AnalyticsProvider
  ) {
    this.faultStore
      .getFaultTotals()
      .subscribe((faultSummaries) => (this.faultSummaries = faultSummaries));
    this.testResult =
      this.faultStore.getTestResult() === TestResult.Fail ? 'unsuccessful' : 'passed';
    this.summaryMetadata = this.summaryMetadataService.getMetadata();

    this.slotDetail = this.navParams.get('slotDetail');
  }

  ionViewDidEnter() {
    if (this.faultStore.getTestResult() === TestResult.Fail) {
      this.logging.setCurrentPage(AnalyticsScreenNames.FAIL_RESULTS_DEBRIEF);
    } else {
      this.logging.setCurrentPage(AnalyticsScreenNames.PASS_RESULTS_DEBRIEF);
    }
  }

  getTestOutcomeContentClass() {
    return this.faultStore.getTestResult() === TestResult.Fail
      ? 'unsuccessful-test-outcome-content'
      : 'successful-test-outcome-content';
  }

  getNextPage() {
    this.faultStore.getTestResult() === TestResult.Fail
      ? this.navCtrl.push(this.postTestSummaryPage, { slotDetail: this.slotDetail })
      : this.navCtrl.push(this.passDataCollectionPage, { slotDetail: this.slotDetail });
  }

  wasThereAnyFault(): boolean {
    return Object.keys(this.faultSummaries).some(
      (fault: string) => this.faultSummaries[fault].total > 0
    );
  }

  getTitle(): string {
    const name: ICandidateName = this.slotDetail.candidateName;
    return `${name.firstName} ${name.lastName} - test debrief`;
  }

  goBack() {
    this.navCtrl.pop({ animate: false });
  }
}
