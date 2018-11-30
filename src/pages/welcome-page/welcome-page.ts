import { Page } from 'ionic-angular/navigation/nav-util';
import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { HelpSectionPage } from '../../help/pages/help-section/help-section';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome-page.html'
})
export class WelcomePage {
  title: string = 'Welcome';
  journalPage: Page = JournalPage;
  helpPage: Page = HelpSectionPage;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public logging: AnalyticsProvider
  ) {}

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.WELCOME);
  }
}
