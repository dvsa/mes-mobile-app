import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { JournalPage } from '../journal/journal';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome-page.html'
})
export class WelcomePage {
  title: string = 'Welcome';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  navToJournal() {
    this.navCtrl.push(JournalPage);
  }
}
