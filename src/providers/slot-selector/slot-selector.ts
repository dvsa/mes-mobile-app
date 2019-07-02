import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { Slot } from '../../pages/journal/journal.model';
import { ActivitySlotComponent } from '../../pages/journal/components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../../pages/journal/components/empty-slot/empty-slot';
import { has, isEmpty, forOwn, isNil, isObject } from 'lodash';
import { TestSlot } from '@dvsa/mes-journal-schema';
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
      slotItem.component = this.resolveComponentName(slotItem);
    }
    return slotItems;
  }

  private isBookingEmptyOrNull = (slot:SlotItem):boolean => {
    const { slotData } = slot;
    if (!has(slotData, 'booking')) {
      return true;
    }
    let gotValue:boolean = false;
    if (isEmpty((<TestSlot>slotData).booking)) {
      return true;
    }
    gotValue = this.checkPropertiesHaveValues((<TestSlot>slotData).booking);
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

  public isTestSlot = (slot:Slot) => has(slot, 'vehicleSlotType');

  private resolveComponentName = (slot:SlotItem) => {
    const { slotData } = slot;

    if (has(slotData, 'activityCode')) {
      return ActivitySlotComponent;
    }
    if (this.isBookingEmptyOrNull(slot)) {
      return EmptySlotComponent;
    }

    return TestSlotComponent;
  }
}
