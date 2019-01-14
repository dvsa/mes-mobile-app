import { Component, Input } from '@angular/core';
import { SlotComponent } from '../slot/slot';
import { isNil } from 'lodash';

@Component({
  selector: 'activity-slot',
  templateUrl: 'activity-slot.html'
})
export class ActivitySlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  constructor() {}

  formatActivityCode(activityCode: string): string {
    if(isNil(activityCode)) {
      return '0';
    }
    return activityCode.replace(/^\w*0/, '');
  }

}
