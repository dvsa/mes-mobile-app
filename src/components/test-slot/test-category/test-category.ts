import { Component, Input } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

@Component({
  selector: 'test-category',
  templateUrl: 'test-category.html',
})
export class TestCategoryComponent {
  @Input()
  category: TestCategory;

  constructor() {}

}
