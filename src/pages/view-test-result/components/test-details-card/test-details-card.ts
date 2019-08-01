import { Component, Input } from '@angular/core';
import { TestDetailsModel } from './test-details-card.model';

@Component({
  selector: 'test-details-card',
  templateUrl: 'test-details-card.html',
})
export class TestDetailsCardComponent {

  @Input()
  data: TestDetailsModel;

  constructor() {}

  specialNeedsIsPopulated(specialNeedsArray: string[]): boolean {
    return specialNeedsArray.length > 0 && specialNeedsArray[0] !== 'None';
  }

}
