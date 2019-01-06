import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { SlotComponent } from '../../../../providers/slot-selector/slot-component.interface';

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html'
})
export class TestSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  constructor() {}

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }
}
