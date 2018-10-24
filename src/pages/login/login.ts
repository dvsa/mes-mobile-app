import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { Page } from 'ionic-angular/navigation/nav-util';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  title: string = 'Login';
  journalPage: Page = JournalPage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) { }

  navToJournal() {
    // Nav to Journal and they remove login from the stack so we can pop to root later
    this.navCtrl
      .push(JournalPage)
      .then(() => this.navCtrl.remove(this.viewCtrl.index));
  }
}
