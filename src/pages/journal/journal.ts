import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { JournalProvider } from '../../providers/journal/journal';
import { ExaminerWorkSchedule } from '../../common/domain/Journal';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage extends BasePageComponent implements OnInit {

  private journalJson: ExaminerWorkSchedule;
  public journalSlot: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authentication: AuthenticationProvider,
    public journalProvider: JournalProvider
  ) {
    super(platform, navCtrl, authentication)
  }

  ngOnInit() {
    this.journalProvider.getJournal().subscribe((journal) => {
      this.journalJson = journal;
      this.journalSlot = this.journalJson.testSlot;
    })
  }
}
