import { Component, Input } from '@angular/core';
import { get, isNil } from 'lodash';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';

@Component({
  selector: 'fake-test-slot',
  templateUrl: 'fake-test-slot.html',
})
export class FakeTestSlotComponent {
  @Input()
  slot: any;

  @Input()
  testStatus: TestStatus;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  showLocation: boolean;

  @Input()
  canStartTest: boolean;

  constructor(
    public screenOrientation: ScreenOrientation,
    public appConfig: AppConfigProvider,
    public dateTimeProvider: DateTimeProvider,
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
}
