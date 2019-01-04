import { Injectable } from '@angular/core';
import { JournalSlotComponent } from '../../pages/journal/journal-components/journal-slot/journal-slot';
import { SlotItem } from './slot-item';
import { SlotComponent } from './slot-component.interface';

@Injectable()
export class SlotSelectorProvider {

  constructor() { }

  public getSlotTypes = (slots: any): SlotItem[] => {

    if(slots === undefined ) {
      return []
    }

    let result: SlotItem[] = [];

    for(let slot of slots) {
      result.push(new SlotItem(
        this.resolveComponentName(slot.vehicleSlotType),
        slot
      ))
    }
    return result;
  }

  private resolveComponentName = (slotType: string): SlotComponent => {
    switch (slotType) {
      case 'B57mins':
        return new JournalSlotComponent
      default:
        return new class BlankComponent implements SlotComponent { slot = {} }
    }
  }
}
