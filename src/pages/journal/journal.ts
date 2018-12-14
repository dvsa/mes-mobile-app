import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { JournalProvider } from '../../providers/journal/journal';
import { ExaminerWorkSchedule } from '../../common/domain/Journal';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';

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
    public authenticationService: AuthenticationServiceProvider,
    public journalService: JournalProvider
  ) {
    super(platform, navCtrl, authenticationService)
  }

  ngOnInit() {
    this.journalService.getJournal().subscribe((journal) => {
      this.journalJson = journal;
      this.journalSlot = this.journalJson.testSlot;
    })
  }
}
