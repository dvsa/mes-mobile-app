import { Component, Input } from '@angular/core';
import { SlotComponent } from '../../../../components/test-slot/slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'empty-slot',
  templateUrl: 'empty-slot.html',
})
export class EmptySlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  showLocation: boolean;

  constructor(public screenOrientation: ScreenOrientation) {}

  isPortrait() : boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }
}
