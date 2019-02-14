import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { TestCategory } from '../../../../common/test-category';
// import { PassFinalisationPageModule } from '../../../pass-finalisation/pass-finalisation.module';

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html',
})
export class TestSlotComponent implements SlotComponent {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  showLocation: boolean;

  constructor(public screenOrientation: ScreenOrientation) {}

  isIndicatorNeededForSlot(): boolean {
    const specialNeeds:boolean = get(this.slot, 'booking.application.specialNeeds', '').length > 0;
    const checkNeeded:boolean = this.slot.booking.application.entitlementCheck || false;

    return specialNeeds || checkNeeded;
  }

  isSpecialNeedsSlot(): boolean {
    return get(this.slot, 'booking.application.specialNeeds', '').length > 0;
  }

  isPortrait() : boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }

  showVehicleDetails(): boolean {
    return vehicleDetails[this.slot.booking.application.testCategory as TestCategory];
  }
}
