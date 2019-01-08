import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { zipWith } from 'lodash';
import { TestSlot } from '../../pages/journal/journal.model';

@Injectable()
export class SlotSelectorProvider {

  constructor() { }

  public getSlotTypes = (emmitted: [TestSlot[], boolean[], any, any]): SlotItem[] => {

    const slots = emmitted[0];
    const slotChangedIndicators = emmitted[1];
    const slotsAndChanges = zipWith(slots, slotChangedIndicators, (slot, changed) => (
      {
        slot,
        changed,
      }
    ));
    const result: SlotItem[] = [];
    if (Array.isArray(slots)) {
      for (const slotAndChange of slotsAndChanges) {
        const slot: TestSlot = slotAndChange.slot;
        result.push(new SlotItem(
          this.resolveComponentName(slot.vehicleSlotType),
          slot,
          slotAndChange.changed
        ))
      }
    }
    return result;
  }

  private resolveComponentName = (slotType: string) => {
    switch (slotType) {
      case 'B57mins':
      default:
        return TestSlotComponent
    }
  }
}
