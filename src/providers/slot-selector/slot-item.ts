import { Type } from '@angular/core';
import { SlotComponent } from '../../pages/journal/journal-components/slot/slot';

export class SlotItem {
  constructor(public component: Type<SlotComponent>, public slotData: any) { }
}
