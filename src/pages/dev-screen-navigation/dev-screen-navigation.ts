import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DASHBOARD_PAGE, JOURNAL_PAGE } from '../page-names.constants';

@IonicPage()
@Component({
  selector: 'dev-screen-navigation',
  templateUrl: 'dev-screen-navigation.html',
})
export class DevScreenNavigationPage {

  constructor(
    public navController: NavController,
  ) {
  }

  goToDashboard() {
    return this.navController.setRoot(DASHBOARD_PAGE);
  }
  goToJournal() {
    this.navController.push(JOURNAL_PAGE);
  }
}
