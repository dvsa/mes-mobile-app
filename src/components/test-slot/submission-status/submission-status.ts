import { Component, Input } from '@angular/core';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';

@Component({
  selector: 'submission-status',
  templateUrl: 'submission-status.html',
})
export class SubmissionStatusComponent {

  @Input()
  testStatus: TestStatus;

  constructor() { }

  showBanner = () : boolean => this.testStatus === TestStatus.Completed;
}
