import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'journal-test-outcome',
  templateUrl: 'journal-test-outcome.html'
})
export class JournalTestOutcomeComponent implements OnInit {
  @Input()
  slot: any;

  canStartTest: boolean = true;
  outcome: string = '1'; // todo - get the activity code

  constructor() {}

  ngOnInit() {}

}
