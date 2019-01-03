import { Component, Input } from '@angular/core';
import { get } from 'lodash';

@Component({
  selector: 'journal-slot',
  templateUrl: 'journal-slot.html',
  inputs: ['slot']
})
export class JournalSlotComponent {
  @Input()
  slot: any;
  constructor() {
  }

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }
}
