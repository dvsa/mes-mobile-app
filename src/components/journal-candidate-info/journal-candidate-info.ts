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
  testCategory: number;
  @Input()
  testComplete: boolean;

  constructor() {}

  getName() {
    return getFormattedCandidateName(this.candidateName);
  }

  extractCategoryCode(slotType: string) {
    // slotType comes from the vehicleSlotType key in the journal data
    // Examples of slotType parameter: 'B57mins' / 'Voc90mins'
    if (slotType === null) return 'N/A';
    const re = /^[a-zA-Z]*/;
    return slotType.match(re);
  }
}
