import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { TestSlot } from '../../pages/journal/journal.model';
import { JournalSlot } from '../../pages/journal/domain/JournalSlot';

@Injectable()
export class SlotSelectorProvider {

  constructor() { }

  public getSlotTypes = (journalSlots: JournalSlot[]): SlotItem[] => {

    const result: SlotItem[] = [];
    if (Array.isArray(journalSlots)) {
      for (const journalSlot of journalSlots) {
        const testSlot: TestSlot = journalSlot.slot;
        result.push(new SlotItem(
          this.resolveComponentName(testSlot.vehicleSlotType),
          testSlot,
          journalSlot.hasSlotChanged
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
