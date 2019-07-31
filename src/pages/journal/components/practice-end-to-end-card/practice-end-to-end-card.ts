import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'practice-end-to-end-card',
  templateUrl: 'practice-end-to-end-card.html',
})

export class PracticeEndToEndCardComponent {

  constructor(private navController: NavController) { }

  navigateToFakeJournal = () => {
    this.navController.push('FakeJournalPage');
  }

}
