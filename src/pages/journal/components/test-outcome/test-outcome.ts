import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html'
})
export class TestOutcomeComponent {
  @Input()
  slot: any;

  canStartTest: boolean = true;
  canSubmitTest: boolean = false
  outcome: string = '1'; // todo - get the activity code

  constructor() {}
}
