import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JournalProvider } from '../../providers/journal/journal';

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage implements OnInit {

  journalData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public journalService: JournalProvider) {}

  ngOnInit (){
    this.journalService.getJournal().subscribe( (journal)=> {
      this.journalData = journal;
    })
  }

}
