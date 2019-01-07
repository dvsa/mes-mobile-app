import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html'
})
export class TestOutcomeComponent implements OnInit {
  @Input()
  slot: any;

  canStartTest: boolean = true;
  outcome: string = '1'; // todo - get the activity code

  constructor() {}

  ngOnInit() {}

}
