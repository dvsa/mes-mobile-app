import { Component, Input } from '@angular/core';

@Component({
  selector: 'time',
  templateUrl: 'time.html'
})
export class TimeComponent {

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
