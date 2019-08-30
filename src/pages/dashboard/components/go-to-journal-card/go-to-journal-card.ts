import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JOURNAL_PAGE } from '../../../page-names.constants';

@Component({
  selector: 'go-to-journal-card',
  templateUrl: 'go-to-journal-card.html',
})

export class GoToJournalCardComponent {

  constructor(private navController: NavController) { }

  navigateToJournal = () => {
    this.navController.push(JOURNAL_PAGE);
  }
}
