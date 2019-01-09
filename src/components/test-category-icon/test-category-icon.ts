import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-category-icon',
  templateUrl: 'test-category-icon.html'
})
export class TestCategoryIconComponent {
  @Input()
  category: string;

  categoryIcons = {
    'A': 'assets/icon/test-categories/A.png',
    'A1': 'assets/icon/test-categories/A1.png',
    'A2': 'assets/icon/test-categories/A2.png',
    'AM': 'assets/icon/test-categories/AM.png',
    'B': 'assets/icon/test-categories/B.png',
    'B1': 'assets/icon/test-categories/B1.png',
    'B+E': 'assets/icon/test-categories/BE.png',
    'C': 'assets/icon/test-categories/C.png',
    'C1': 'assets/icon/test-categories/C1.png',
    'C1+E': 'assets/icon/test-categories/C1E.png',
    'C+E': 'assets/icon/test-categories/CE.png',
    'D': 'assets/icon/test-categories/D.png',
    'D1': 'assets/icon/test-categories/D1.png',
    'D1+E': 'assets/icon/test-categories/D1E.png',
    'D+E': 'assets/icon/test-categories/DE.png'
  }

  constructor() { }

  getCategoryIcon(): string {
    return this.categoryIcons[this.category];
  }
}
