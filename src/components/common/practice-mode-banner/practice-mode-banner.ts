import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JOURNAL_PAGE } from '../../../pages/page-names.constants';

@Component({
  selector: 'practice-mode-banner',
  templateUrl: 'practice-mode-banner.html',
})

export class PracticeModeBanner {

  constructor(
    public navController: NavController,
  ) {}

  exitPracticeMode() {
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    this.navController.popTo(journalPage, { animate: false });
  }
}
