import { Type } from "@angular/core";
import { SlotComponent } from "./slot-component.interface";

export class SlotItem {
  constructor(public component: Type<SlotComponent>, public slotData: any) {}
}
