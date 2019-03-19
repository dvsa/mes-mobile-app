import { Component, Input } from '@angular/core';
import { get, isNil } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { TestCategory } from '../../../../shared/models/test-category';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { DateTime } from '../../../../shared/helpers/date-time';

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

  constructor(
    public screenOrientation: ScreenOrientation,
    public appConfig: AppConfigProvider,
  ) {}

  isIndicatorNeededForSlot(): boolean {
    const specialNeeds: boolean = this.isSpecialNeedsSlot();
    const checkNeeded: boolean = this.slot.booking.application.entitlementCheck || false;

    return specialNeeds || checkNeeded;
  }

  isSpecialNeedsSlot(): boolean {
    const specialNeeds = get(this.slot, 'booking.application.specialNeeds', '');
    return !isNil(specialNeeds) && specialNeeds.length > 0;
  }

  isPortrait() : boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }

  showVehicleDetails(): boolean {
    return vehicleDetails[this.slot.booking.application.testCategory as TestCategory];
  }

  canStartTest(): boolean {
    if (!this.appConfig.getAppConfig().journal.allowTests) {
      return false;
    }

    const startDate = new DateTime(this.slot.slotDetail.start);
    if (startDate.daysDiff(DateTime.now()) !== 0) {
      return false;
    }

    const testCategory = this.slot.booking.application.testCategory;
    const allowedTestCategories = this.appConfig.getAppConfig().journal.allowedTestCategories;

    if (allowedTestCategories.includes(testCategory)) {
      return true;
    }

    return false;
  }
}
