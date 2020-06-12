import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
import { ActivityCode, Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';
import { ActivityCodes } from '../../../../../shared/models/activity-codes';
import { TestOutcome } from '../../../../../modules/tests/tests.constants';

@IonicPage()
@Component({
  selector: 'end-test-modal',
  templateUrl: 'cpc-end-test-modal.html',
})
export class CPCEndTestModal implements OnInit {
  questions: (Question | Question5)[];
  totalPercentage: number;
  testResult: ActivityCode;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {}

  ngOnInit() {
    this.questions = this.navParams.get('cpcQuestions');
    this.totalPercentage = this.navParams.get('totalPercentage');
    this.testResult = this.navParams.get('testResult');
  }

  async onCancel() {
    await this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  async onContinue() {
    await this.viewCtrl.dismiss(ModalEvent.CONTINUE);
  }

  async onTerminate() {
    await this.viewCtrl.dismiss(ModalEvent.TERMINATE);
  }

  getTestResultLabel(): TestOutcome {
    return (this.testResult === ActivityCodes.PASS ? TestOutcome.Passed : TestOutcome.Failed);
  }

  getTestResultClass(): string {
    return (this.testResult === ActivityCodes.PASS ? 'test-result-pass-label' : 'test-result-fail-label');
  }

}
