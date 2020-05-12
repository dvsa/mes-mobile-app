import { Component, Input } from '@angular/core';
import { get } from 'lodash';

import { TestDetailsModel } from '../../../components/test-details-card/test-details-card.model';

export type CandidateDetails = { prn: number; attemptNumber: number; };

@Component({
  selector: 'test-details-card-adi2',
  templateUrl: 'test-details.cat-adi-part2.html',
})
export class TestDetailsCardCatADI2Component {

  @Input()
  data: TestDetailsModel;

  @Input()
  candidateDetails: CandidateDetails;

  constructor() {
  }

  specialNeedsIsPopulated(specialNeedsArray: string[]): boolean {
    return specialNeedsArray.length > 0 && specialNeedsArray[0] !== 'None';
  }

  showAttemptNumber(): boolean {
    return get(this.candidateDetails, 'attemptNumber', null) !== null ||
      typeof get(this.candidateDetails, 'attemptNumber') !== 'undefined';
  }

  showPrn(): boolean {
    return get(this.candidateDetails, 'prn', null) !== null ||
      typeof get(this.candidateDetails, 'prn') !== 'undefined';
  }

}
