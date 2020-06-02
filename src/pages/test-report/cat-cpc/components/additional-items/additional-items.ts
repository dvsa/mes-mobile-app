import { Component, Input } from '@angular/core';

@Component({
  selector: 'additional-items',
  templateUrl: 'additional-items.html',
})
export class AdditionalItemsComponent {

  @Input()
  additionalItems: string[];

  showAdditionalItems = (additionalItems: string[]): boolean => additionalItems.length > 0;

}
