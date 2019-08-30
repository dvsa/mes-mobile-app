import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DASHBOARD_PAGE } from '../../../pages/page-names.constants';

@Component({
  selector: 'practice-mode-banner',
  templateUrl: 'practice-mode-banner.html',
})

export class PracticeModeBanner {

  constructor(
    public navController: NavController,
  ) {}

  exitPracticeMode() {
    const dashboardPage = this.navController.getViews().find(view => view.id === DASHBOARD_PAGE);
    this.navController.popTo(dashboardPage, { animate: false });
  }
}
