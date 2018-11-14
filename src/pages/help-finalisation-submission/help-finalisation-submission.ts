import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-help-finalisation-submission',
  templateUrl: 'help-finalisation-submission.html'
})
export class HelpFinalisationSubmissionPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpFinalisationSubmissionPage');
  }
}
