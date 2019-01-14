import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { TestSlotComponent } from '../../pages/journal/components/test-slot/test-slot';
import { TestSlot } from '../../pages/journal/journal.model';
import { ActivitySlotComponent } from '../../pages/journal/components/activity-slot/activity-slot';
import { Activity, activities } from './activity.constants';

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
    if (this.isNonTestActivityCode(activityCode)) {
      return ActivitySlotComponent;
    }

    switch (slotType) {
      case 'B57mins':
      default:
        return TestSlotComponent
    }
  }

  public activityCodeDisplayName(activityCode: string): string {
    const matchingActivity: Activity = activities.find(a => a.activityCode === activityCode);
    if (matchingActivity) {
      return matchingActivity.displayName || matchingActivity.description;
    }
    return 'Unknown';
  }

  private isNonTestActivityCode(activityCode: string): boolean {
    const ntaCodes = [
      '091',
      '094',
      '096',
      '142',
    ];
    return ntaCodes.includes(activityCode);
  }
}

