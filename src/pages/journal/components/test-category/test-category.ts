import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-category',
  templateUrl: 'test-category.html'
})
export class TestCategoryComponent {
  @Input()
  category: string;

  constructor() {}

}
