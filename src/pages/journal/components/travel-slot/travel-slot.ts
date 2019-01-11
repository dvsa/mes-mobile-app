import { Component, Input } from '@angular/core';
import { SlotComponent } from '../slot/slot';

@Component({
  selector: 'travel-slot',
  templateUrl: 'travel-slot.html'
})
export class TravelSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  constructor() {}

}
