import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'journal-test-activity',
  templateUrl: 'journal-test-activity.html'
})
export class JournalTestActivityComponent implements OnInit {
  @Input()
  testSlot: string;

  canStartTest: boolean = true;

  constructor() {}

  ngOnInit() {}

}
