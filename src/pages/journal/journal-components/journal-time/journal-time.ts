import { Component, Input } from '@angular/core';

@Component({
  selector: 'journal-time',
  templateUrl: 'journal-time.html'
})
export class JournalTimeComponent {

  @Input()
  time: string;

  @Input()
  testComplete: boolean;

  ngOnInit() {
    this.testComplete = true; // TODO pick up testComplete from JSON when available
  }

  constructor() {
  }

}
