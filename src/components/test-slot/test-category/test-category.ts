import { Component, Input } from '@angular/core';
import { TestCategory } from '../../../shared/models/test-category';

@Component({
  selector: 'test-category',
  templateUrl: 'test-category.html',
})
export class TestCategoryComponent {
  @Input()
  category: TestCategory;

  constructor() {}

}
