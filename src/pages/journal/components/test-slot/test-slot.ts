import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { get, isNil } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { TestCategory } from '../../../../shared/models/test-category';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { DateTime } from '../../../../shared/helpers/date-time';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html',
})
export class TestSlotComponent implements SlotComponent, OnInit, OnDestroy {
  @Input()
  slot: any;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  showLocation: boolean;

  slotStatus$: Observable<TestStatus>;

  subscription: Subscription;

  constructor(
    public screenOrientation: ScreenOrientation,
    public appConfig: AppConfigProvider,
    public dateTimeProvider: DateTimeProvider,
    public store$: Store<StoreModel>,
  ) {}

  ngOnInit(): void {
    const { slotId } = this.slot.slotDetail;
    this.slotStatus$ = this.store$.pipe(
      select(getTests),
      select(t => t.testLifecycles[slotId]),
    );

    this.subscription = this.slotStatus$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

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
    if (startDate.daysDiff(this.dateTimeProvider.now()) !== 0) {
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
