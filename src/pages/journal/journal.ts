import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage implements OnInit {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit (){}

}
