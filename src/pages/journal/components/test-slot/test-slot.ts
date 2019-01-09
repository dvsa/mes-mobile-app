import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html'
})
export class TestSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  constructor(public screenOrientation: ScreenOrientation) {}

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }

  isPortrait() : boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }

  showVehicleDetails(): boolean {
    return vehicleDetails[this.slot.booking.application.testCategory]
  }
}
