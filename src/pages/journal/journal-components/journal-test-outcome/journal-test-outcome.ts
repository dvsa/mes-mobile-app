import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'journal-test-outcome',
  templateUrl: 'journal-test-outcome.html'
})
export class JournalTestOutcomeComponent implements OnInit {
  @Input()
  slot: any;

  @Output() onStartTest = new EventEmitter<any>();

  canStartTest: boolean = true;
  outcome: string = '1'; // todo - get the activity code

  constructor() {}

  ngOnInit() {}

  startTestClicked(){
    this.onStartTest.emit(this.slot);
  }
}
