import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html'
})
export class TestSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  vehicleDetails = {
    'A': false,
    'A1': false,
    'A2': false,
    'AM': false,
    'B': false,
    'B1': false,
    'B+E': false,
    'C': true,
    'C1': true,
    'C1+E': true,
    'C+E': true,
    'D': true,
    'D1': true,
    'D1+E': true,
    'D+E': true,
    'DE D1+E' : true
  }

  constructor(public screenOrientation: ScreenOrientation) {}

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }

  isPortrait() : boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }

  showVehicleDetails(): boolean {
    return this.vehicleDetails[this.slot.booking.application.testCategory]
  }
}
