import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { Slot } from '../../pages/journal/journal.model';
import { ActivitySlotComponent } from '../../pages/journal/components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../../pages/journal/components/empty-slot/empty-slot';
import { has, isEmpty } from 'lodash';
@Injectable()
export class SlotSelectorProvider {

  constructor() { }

  public getSlotTypes = (slotItems: SlotItem[]): SlotItem[] => {
    if (!Array.isArray(slotItems)) {
      return [];
    }

    for (const slotItem of slotItems) {
      const slot: Slot = slotItem.slotData;
      slotItem.component = this.resolveComponentName(slot);
    }
    return slotItems;
  }

  private resolveComponentName = (slot:Slot) => {

    if ((has(slot, 'booking') && isEmpty(slot.booking)) &&
        (!has(slot, 'activityCode') || slot.activityCode === null)) {
      return EmptySlotComponent;
    }

    if (has(slot, 'vehicleSlotType') && slot.vehicleSlotType === 'B57mins') {
      return TestSlotComponent;
    }
    return ActivitySlotComponent;
  }
}
