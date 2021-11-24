import { Component, Input } from '@angular/core';
import { TestDetailsModel } from './test-details-card.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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

  showFullCatHeld(): boolean {
    return [TestCategory.CE, TestCategory.C1E, TestCategory.DE, TestCategory.D1E].includes(this.data.category);
  }

}
