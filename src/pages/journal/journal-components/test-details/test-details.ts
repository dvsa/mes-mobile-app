import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-details',
  templateUrl: 'test-details.html'
})
export class TestDetailsComponent {
  @Input()
  testCentreName: string;

  constructor() {}
}
