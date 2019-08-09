import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'time',
  templateUrl: 'time.html',
})
export class TimeComponent implements OnInit {

  @Input()
  time: string;

  @Input()
  testComplete: boolean;

  ngOnInit() {
    // TODO pick up testComplete from JSON when available
    this.testComplete = true;
  }

  constructor() {
  }

}
