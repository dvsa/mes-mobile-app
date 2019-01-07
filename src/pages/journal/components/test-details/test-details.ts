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

  constructor() {}

  getCategoryIcon() : string {
    switch(this.category) {
      case 'A1':
      case 'B':
        return 'assets/icon/test-categories/category-b.png'
      case 'C1':
      case 'C+E':
      case 'D':
      case 'D1':
      default:
      return ''
    }
  }

  showAdditionalInformation() : boolean {
    switch(this.category) {
      case 'A1':
      case 'B':
        return false
      case 'C1':
      case 'C+E':
      case 'D':
      case 'D1':
      default:
      return true;
    }
  }
}
