import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-help-test-report',
  templateUrl: 'help-test-report.html'
})
export class HelpTestReportPage {
  title: 'Test Report - Help';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpTestReportPage');
  }
}
