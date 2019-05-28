import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'practice-mode-banner',
  templateUrl: 'practice-mode-banner.html',
})

export class PracticeModeBanner {

  constructor(
    public navController: NavController,
  ) {}

  exitPracticeMode() {
    this.navController.popToRoot({ animate: false });
  }
}
