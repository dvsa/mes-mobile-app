import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { TestSlot } from '../../pages/journal/journal.model';
import { TravelSlotComponent } from '../../pages/journal/components/travel-slot/travel-slot';

@Injectable()
export class SlotSelectorProvider {

  constructor() { }

  public getSlotTypes = (slotItems: SlotItem[]): SlotItem[] => {
    if (!Array.isArray(slotItems)) {
      return [];
    }

    for (const slotItem of slotItems) {
      const testSlot: TestSlot = slotItem.slotData;
      slotItem.component = this.resolveComponentName(testSlot.vehicleSlotType, testSlot.activityCode);
    }
    return slotItems;
  }

  private resolveComponentName = (slotType: string, activityCode: string) => {
    if (activityCode === '091') {
      return TravelSlotComponent;
    }

    switch (slotType) {
      case 'B57mins':
      default:
        return TestSlotComponent
    }
  }
}
