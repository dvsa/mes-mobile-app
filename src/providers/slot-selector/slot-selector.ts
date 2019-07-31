import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { Slot } from '../../pages/journal/journal.model';
import { ActivitySlotComponent } from '../../pages/journal/components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../../pages/journal/components/empty-slot/empty-slot';
import { has, isEmpty, forOwn, isNil, isObject } from 'lodash';
@Injectable()
export class SlotSelectorProvider {

  private ignoreBookingProperty: string[] = [
    'entitlementCheck',
    'extendedTest',
    'progressiveAccess',
    'specialNeeds',
    'vehicleSeats',
    'welshTest',
  ];
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

  private isBookingEmptyOrNull = (slot:Slot):boolean => {
    let gotValue:boolean = false;
    if (has(slot, 'booking') && isEmpty(slot.booking)) {
      return true;
    }
    gotValue = this.checkPropertiesHaveValues(slot.booking);
    return !gotValue;
  }

  private checkPropertiesHaveValues = (obj:any):boolean => {
    let gotValue: boolean = false;

    forOwn(obj, (value, key) => {
      if (this.ignoreBookingProperty.indexOf(key) < 0) {
        if (isObject(value)) {
          if (this.checkPropertiesHaveValues(value)) {
            gotValue = true;
          }
        } else if (!isNil(value)) {
          gotValue = true;
        }
      }
    });
    return gotValue;
  }

  private resolveComponentName = (slot:Slot) => {

    if (this.isBookingEmptyOrNull(slot) &&
        (!has(slot, 'activityCode') || slot.activityCode === null)) {
      return EmptySlotComponent;
    }

    if (has(slot, 'vehicleSlotType')) {
      return TestSlotComponent;
    }
    return ActivitySlotComponent;
  }
}
