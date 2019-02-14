import { Component, Input } from '@angular/core';
import { Name } from '../../../../common/domain/DJournal';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'candidate-link',
  templateUrl: 'candidate-link.html',
})
export class CandidateLinkComponent {
  @Input()
  slotId: number;

  @Input()
  slotChanged: boolean;

  @Input()
  name: Name;

  @Input()
  testComplete: boolean;

  @Input()
  welshLanguage: boolean;

  @Input()
  isPortrait: boolean;

  constructor(public navController: NavController) {
  }

  navigateToCandidateDetails() {
    this.navController.push('CandidateDetailsPage', { slotId: this.slotId, slotChanged: this.slotChanged });
  }
}
