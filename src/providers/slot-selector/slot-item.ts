import { Type } from '@angular/core';
import { SlotComponent } from '../../pages/journal/components/slot/slot';
import { TestSlot, NonTestActivity } from '@dvsa/mes-journal-schema';

export class SlotItem {
  constructor(
    public slotData: TestSlot | NonTestActivity,
    public hasSlotChanged: boolean,
    public component?: Type<SlotComponent>,
    public activityCode?: string,
  ) { }
}
