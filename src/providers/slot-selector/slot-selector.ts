import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';

@Injectable()
export class SlotSelectorProvider {

  constructor() { }

  public getSlotTypes = (slots: any): SlotItem[] => {

    const result: SlotItem[] = [];
    if (Array.isArray(slots)) {
      for (const slot of slots) {
        result.push(new SlotItem(
          this.resolveComponentName(slot.vehicleSlotType),
          slot
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
