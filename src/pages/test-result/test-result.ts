import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { PostTestSummaryPage } from '../post-test-summary/post-test-summary';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';
import { IFaultSummary } from '../../components/test-summary/interfaces/IFaultSummary';
import { TestResult } from '../../components/test-summary/enums/TestResult';
import { PassDataCollectionPage } from '../pass-data-collection/pass-data-collection';

@Component({
  selector: 'page-test-result',
  templateUrl: 'test-result.html'
})
export class TestResultPage {
  postTestSummaryPage: Page = PostTestSummaryPage;
  passDataCollectionPage: Page = PassDataCollectionPage;
  testResult: string;
  faultSummaries: {
    [key: string]: IFaultSummary;
  };
  summaryMetadata: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faultStore: FaultStoreProvider,
    private summaryMetadataService: TestSummaryMetadataProvider
  ) {
    this.faultStore
      .getFaultTotals()
      .subscribe((faultSummaries) => (this.faultSummaries = faultSummaries));
    this.testResult =
      this.faultStore.getTestResult() === TestResult.Fail ? 'unsuccessful' : 'passed';
    this.summaryMetadata = this.summaryMetadataService.getMetadata();
  }

  getTestOutcomeContentClass() {
    return this.faultStore.getTestResult() === TestResult.Fail
      ? 'unsuccessful-test-outcome-content'
      : 'successful-test-outcome-content';
  }

  getNextPage(): Page {
    return this.testResult === TestResult.Fail
      ? this.postTestSummaryPage
      : this.passDataCollectionPage;
  }

  wasThereAnyFault(): boolean {
    return Object.keys(this.faultSummaries).some(
      (fault: string) => this.faultSummaries[fault].total > 0
    );
  }

  goBack() {
    this.navCtrl.pop({ animate: false });
  }
}
