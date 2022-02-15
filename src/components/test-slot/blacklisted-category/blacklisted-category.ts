import { Component, Input } from '@angular/core';

@Component({
  selector: 'blacklisted-category',
  templateUrl: 'blacklisted-category.html',
})
export class BlacklistedCategoryComponent {

  @Input()
  slotAccessed: boolean;

  constructor() {
  }

}
