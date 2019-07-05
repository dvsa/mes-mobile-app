import { Component, Input } from '@angular/core';
import { TestDetailsModel } from './test-details.model';

@Component({
  selector: 'test-details',
  templateUrl: 'test-details.html',
})
export class TestDetailsComponent {

  @Input()
  data: TestDetailsModel;

  constructor() {}

}
