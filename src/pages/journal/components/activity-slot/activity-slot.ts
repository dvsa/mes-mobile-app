import { Component, Input } from '@angular/core';
import { SlotComponent } from '../../../../components/test-slot/slot/slot';
import { isNil, has } from 'lodash';
import { Activity, activities } from '../../../../providers/slot-selector/activity.constants';

@Component({
  selector: 'activity-slot',
  templateUrl: 'activity-slot.html',
})
export class ActivitySlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  showLocation: boolean;

  constructor() {}

  formatActivityCode(): string {
    const activityCode = this.slot.activityCode;
    if (isNil(activityCode)) {
      return '0';
    }
    // Remove leading zeros (e.g. 089 -> 89)
    return activityCode.replace(/^0+(?!$)/, '');
  }

  public getTitle(): string {
    let returnTitle: string = 'Unknown';

    const activityCode = this.slot.activityCode;
    const matchingActivity: Activity = activities.find(a => a.activityCode === activityCode);
    if (matchingActivity) {
      return matchingActivity.displayName || matchingActivity.description;
    }
    if (has(this.slot, 'activityDescription') && this.slot.activityDescription !== '') {
      returnTitle = this.slot.activityDescription;
    }
    return returnTitle;
  }

  public isTravelSlot(): boolean {
    return this.slot.activityCode === '091';
  }

}
