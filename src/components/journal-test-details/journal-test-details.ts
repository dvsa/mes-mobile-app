import { Component, Input } from '@angular/core';
import { ITestDetails } from '../../providers/journal/journal-model';

@Component({
  selector: 'journal-test-details',
  templateUrl: 'journal-test-details.html'
})
export class JournalTestDetailsComponent {
  @Input()
  testCentreName: string;
  @Input()
  testDetails: ITestDetails;

  constructor() {}
}
