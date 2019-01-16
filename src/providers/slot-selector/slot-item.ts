import { Type } from '@angular/core';
import { SlotComponent } from '../../pages/journal/components/slot/slot';

export class SlotItem {
  constructor(
    public slotData: any,
    public hasSlotChanged: boolean,
    public component?: Type<SlotComponent>,
  ) { }
}
