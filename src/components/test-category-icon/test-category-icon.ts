import { Component, Input } from '@angular/core';
import { TestCategory, testCategoryIcons } from '../../common/test-category';

@Component({
  selector: 'test-category-icon',
  templateUrl: 'test-category-icon.html',
})
export class TestCategoryIconComponent {
  @Input()
  category: string;

  categoryIcons = testCategoryIcons;

  constructor() { }

  getCategoryIcon(): string {
    return this.categoryIcons[this.category as TestCategory];
  }
}
