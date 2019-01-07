import { Injectable } from '@angular/core';
import { JournalSlotComponent } from '../../pages/journal/journal-components/journal-slot/journal-slot';
import { SlotItem } from './slot-item';

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
        return JournalSlotComponent
    }
  }
}
