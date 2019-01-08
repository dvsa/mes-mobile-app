import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { SlotComponent } from '../slot/slot';

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html'
})
export class TestSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  slotChanged: boolean;

  constructor() {}

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }
}
