import { Component, Input } from '@angular/core';
import { ICandidateName } from '../../providers/journal/journal-model';
import { getFormattedCandidateName } from '../../shared/utils/formatters';

@Component({
  selector: 'journal-candidate-info',
  templateUrl: 'journal-candidate-info.html'
})
export class JournalCandidateInfoComponent {
  @Input()
  candidateName: ICandidateName;
  @Input()
  testCategory: string;
  @Input()
  testComplete: boolean;

  constructor() {}

  get name() {
    return getFormattedCandidateName(this.candidateName);
  }

  get categoryCode() {
    // slotType comes from the vehicleSlotType key in the journal data
    // Examples of slotType parameter: 'B57mins' / 'Voc90mins'
    if (this.testCategory === null) return 'N/A';
    const re = /^[a-zA-Z]*/;
    return this.testCategory.match(re)[0];
  }
}
