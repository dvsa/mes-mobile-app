import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-details',
  templateUrl: 'test-details.html'
})
export class TestDetailsComponent {
  @Input()
  category: string;
  @Input()
  transmission: string;
  @Input()
  length: string;
  @Input()
  width: string;
  @Input()
  height: string;
  @Input()
  seats: string;

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

  additionalInformation = {
    'A': false,
    'A1': false,
    'A2': false,
    'AM': false,
    'B': false,
    'B1': false,
    'B+E': false,
    'C': true,
    'C1': true,
    'C1+E': true,
    'C+E': true,
    'D': true,
    'D1': true,
    'D1+E': true,
    'D+E': true
  }

  constructor() { }

  getCategoryIcon(): string {
    return this.categoryIcons[this.category];
  }

  showAdditionalInformation(): boolean {
    return this.additionalInformation[this.category]
  }
}
