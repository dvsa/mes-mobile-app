import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { SlotComponent } from '../../../../providers/slot-selector/slot-component.interface';

@Component({
  selector: 'journal-slot',
  templateUrl: 'journal-slot.html'
})
export class JournalSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  constructor() {}

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }
}
