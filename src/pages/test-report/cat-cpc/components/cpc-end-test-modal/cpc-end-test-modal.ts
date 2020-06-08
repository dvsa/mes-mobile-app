import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
import { Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';

@IonicPage()
@Component({
  selector: 'end-test-modal',
  templateUrl: 'cpc-end-test-modal.html',
})
export class CpcEndTestModal implements OnInit {
  questions: (Question | Question5)[];

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {}

  ngOnInit() {
    console.log(`init`);
    this.questions = this.navParams.get('cpcQuestions');
    console.log(this.questions);
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onContinue() {
    this.viewCtrl.dismiss(ModalEvent.CONTINUE);
  }

  onTerminate() {
    this.viewCtrl.dismiss(ModalEvent.TERMINATE);
  }

}
