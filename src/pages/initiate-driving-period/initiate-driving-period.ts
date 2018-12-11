import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndTestReasonPage } from '../end-test-reason/end-test-reason';
import { Page } from 'ionic-angular/navigation/nav-util';
import { TestResultPage } from '../test-result/test-result';

@Component({
  selector: 'page-initiate-driving-period',
  templateUrl: 'initiate-driving-period.html'
})
export class InitiateDrivingPeriodPage {
  endTestReasonPage: Page = EndTestReasonPage;
  testResultPage: Page = TestResultPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitiateDrivingPeriodPage');
  }
}
