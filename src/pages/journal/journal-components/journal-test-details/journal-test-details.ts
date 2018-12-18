import { Component, Input } from '@angular/core';

@Component({
  selector: 'journal-test-details',
  templateUrl: 'journal-test-details.html'
})
export class JournalTestDetailsComponent {
  @Input()
  testCentreName: string;

  constructor() {}
}
