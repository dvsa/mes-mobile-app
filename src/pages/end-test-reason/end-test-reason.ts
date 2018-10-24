import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-end-test-reason',
  templateUrl: 'end-test-reason.html'
})
export class EndTestReasonPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndTestReasonPage');
  }
}
