import { Component, Input } from '@angular/core';
import { TestCategory } from '../../common/test-category';

@Component({
  selector: 'test-category-icon',
  templateUrl: 'test-category-icon.html'
})
export class TestCategoryIconComponent {
  @Input()
  category: string;


  categoryIcons = {
    [TestCategory.A]: 'assets/icon/test-categories/A.png',
    [TestCategory.A1]: 'assets/icon/test-categories/A1.png',
    [TestCategory.A2]: 'assets/icon/test-categories/A2.png',
    [TestCategory.AM]: 'assets/icon/test-categories/AM.png',
    [TestCategory.B]: 'assets/icon/test-categories/B.png',
    [TestCategory.B1]: 'assets/icon/test-categories/B1.png',
    [TestCategory.BE]: 'assets/icon/test-categories/BE.png',
    [TestCategory.C]: 'assets/icon/test-categories/C.png',
    [TestCategory.C1]: 'assets/icon/test-categories/C1.png',
    [TestCategory.C1E]: 'assets/icon/test-categories/C1E.png',
    [TestCategory.CE]: 'assets/icon/test-categories/CE.png',
    [TestCategory.D]: 'assets/icon/test-categories/D.png',
    [TestCategory.D1]: 'assets/icon/test-categories/D1.png',
    [TestCategory.D1E]: 'assets/icon/test-categories/D1E.png',
    [TestCategory.DE]: 'assets/icon/test-categories/DE.png'
  }

  constructor() { }

  getCategoryIcon(): string {
    return this.categoryIcons[this.category as TestCategory];
  }
}
