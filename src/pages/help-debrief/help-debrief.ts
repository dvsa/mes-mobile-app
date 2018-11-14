import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-help-debrief',
  templateUrl: 'help-debrief.html'
})
export class HelpDebriefPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpDebriefPage');
  }
}
