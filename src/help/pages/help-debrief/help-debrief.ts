import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-help-debrief',
  templateUrl: 'help-debrief.html'
})
export class HelpDebriefPage {
  title: string = 'Debrief - Help';
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
