import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-help-journal',
  templateUrl: 'help-journal.html'
})
export class HelpJournalPage {
  title: string = 'Journal - Help';
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
