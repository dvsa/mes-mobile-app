import { Component, Input, OnInit } from '@angular/core';
import { get, isNil } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { TestCategory } from '../../../../shared/models/test-category';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestStatus, getActivityCodeBySlotId } from '../../../../modules/tests/tests.selector';
import { getSlotType } from '../../../candidate-details/candidate-details.selector';
import { SlotTypes } from '../../../../shared/models/slot-types';
import { map } from 'rxjs/operators';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';

interface TestSlotComponentState {
  testStatus$: Observable<TestStatus>;
  testActivityCode$: Observable<ActivityCode>;
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
  showLocation: boolean;

  componentState: TestSlotComponentState;

  constructor(
    public screenOrientation: ScreenOrientation,
    public appConfig: AppConfigProvider,
    public dateTimeProvider: DateTimeProvider,
    public store$: Store<StoreModel>,
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

  canStartTest(): boolean {
    const { testPermissionPeriods } = this.appConfig.getAppConfig().journal;
    const { testCategory } = this.slot.booking.application;
    const { start } = this.slot.slotDetail;
    const startAsDate = new Date(start);
    startAsDate.setHours(0, 0, 0, 0);
    const periodsPermittingStart = testPermissionPeriods.filter((period) => {
      const slotHasPeriodStartCriteria = this.hasPeriodStartCriteria(startAsDate, period.from);
      const slotHasPeriodEndCriteria = this.hasPeriodEndCritiera(startAsDate, period.to);
      return period.testCategory === testCategory && slotHasPeriodStartCriteria && slotHasPeriodEndCriteria;
    });
    return periodsPermittingStart.length > 0;
  }

  private hasPeriodStartCriteria(slotDate: Date, periodFrom: string) {
    const periodStartDate = new Date(periodFrom);
    periodStartDate.setHours(0, 0, 0, 0);
    return slotDate >= periodStartDate;
  }

  private hasPeriodEndCritiera(slotDate: Date, periodTo: string) {
    if (periodTo === null) {
      return true;
    }
    const periodEndDate = new Date(periodTo);
    periodEndDate.setHours(0, 0, 0, 0);
    return slotDate <= periodEndDate;
  }
}
