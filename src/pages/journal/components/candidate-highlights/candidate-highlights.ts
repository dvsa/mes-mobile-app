import { Component, Input } from '@angular/core';
import { Name } from '../../../../common/domain/DJournal';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'candidate-highlights',
  templateUrl: 'candidate-highlights.html'
})
export class CandidateHighlightsComponent {
  @Input()
  slotId: number;

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
    this.navController.push('CandidateDetailsPage', { slotId: this.slotId });
  }
}
