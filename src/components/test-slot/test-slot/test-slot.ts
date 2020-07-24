import { Component, Input, OnInit } from '@angular/core';
import { get, isNil } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { Observable } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestStatus, getActivityCodeBySlotId, getTestById } from '../../../modules/tests/tests.selector';
import { SlotTypes } from '../../../shared/models/slot-types';
import { map, filter } from 'rxjs/operators';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { getSlotType } from '../../../shared/helpers/get-slot-type';
import { SlotProvider } from '../../../providers/slot/slot';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import * as moment from 'moment';

interface TestSlotComponentState {
  testStatus$: Observable<TestStatus>;
  testActivityCode$: Observable<ActivityCode>;
  isRekey$: Observable<boolean>;
}

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html',
})
export class TestSlotComponent implements SlotComponent, OnInit {
  @Input()
  slot: TestSlot;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  hasSeenCandidateDetails: boolean;

  @Input()
  showLocation: boolean;

  componentState: TestSlotComponentState;

  constructor(
    public screenOrientation: ScreenOrientation,
    public appConfig: AppConfigProvider,
    public dateTimeProvider: DateTimeProvider,
    public store$: Store<StoreModel>,
    private slotProvider: SlotProvider,
  ) { }

  ngOnInit(): void {
    const { slotId } = this.slot.slotDetail;
    this.componentState = {
      testStatus$: this.store$.pipe(
        select(getTests),
        select(tests => getTestStatus(tests, slotId)),
      ),
      testActivityCode$: this.store$.pipe(
        select(getTests),
        map(tests => getActivityCodeBySlotId(tests, this.slot.slotDetail.slotId)),
      ),
      isRekey$: this.store$.pipe(
        select(getTests),
        map(tests => getTestById(tests, this.slot.slotDetail.slotId.toString())),
        filter(test => test !== undefined),
        select(getRekeyIndicator),
        select(isRekey),
      ),
    };
  }

  isIndicatorNeededForSlot(): boolean {
    const specialNeeds: boolean = this.isSpecialNeedsSlot();
    const checkNeeded: boolean = this.slot.booking.application.entitlementCheck || false;
    const nonStandardTest: boolean = getSlotType(this.slot) !== SlotTypes.STANDARD_TEST;

    return specialNeeds || checkNeeded || nonStandardTest;
  }

  isSpecialNeedsSlot(): boolean {
    const specialNeeds = get(this.slot, 'booking.application.specialNeeds', '');
    return !isNil(specialNeeds) && specialNeeds.length > 0;
  }

  isPortrait(): boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }

  showVehicleDetails(): boolean {
    return vehicleDetails[this.slot.booking.application.testCategory as TestCategory];
  }

  showAdditionalCandidateDetails(): boolean {
    return this.slot.booking.application.testCategory === TestCategory.ADI2;
  }

  canStartTest(): boolean {
    return this.slotProvider.canStartTest(this.slot);
  }

  canViewCandidateDetails(): boolean {
    const today = moment();
    const daysToAdd = today.isoWeekday() === 6 ? 2 : today.isoWeekday() === 7 ? 1 : 0;
    const tomorrow = moment().add(daysToAdd, 'days').startOf('day');
    // console.log(tomorrow);

    // const tomorrow: Date = new Date();
    // tomorrow.setDate(new Date().getDate() + 1);
    // tomorrow.setHours(0); tomorrow.setMinutes(0); tomorrow.setSeconds(0); tomorrow.setMilliseconds(0);
    console.log(tomorrow);
    return new Date(this.slot.slotDetail.start) <= new Date();
  }
}
