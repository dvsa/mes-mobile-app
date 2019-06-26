import { Injectable } from '@angular/core';
import { SlotItem } from '../slot-selector/slot-item';
import { SlotSelectorProvider } from '../slot-selector/slot-selector';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class IncompleteTestsProvider {

  constructor(
    public appConfig: AppConfigProvider,
    private slotSelector: SlotSelectorProvider,
  ) { }

  countIncompleteTests = (testsStatuses: { [slotId: string]: TestStatus }, slots: SlotItem[]): number => {
    if (!testsStatuses || !slots) {
      return;
    }

    let count = 0;
    slots.forEach((slot) => {
      if (this.canStartTest(slot) &&
        // this.isDateInPast(slot.slotData.slotDetail.start) &&
        this.slotSelector.isTestSlot(slot.slotData) &&
        testsStatuses[slot.slotData.slotDetail.slotId] !== TestStatus.Submitted
      ) {
        count = count + 1;
      }
    });

    return count;
  }

  canStartTest(slot: SlotItem) {
    if (slot && slot.slotData && slot.slotData.booking && slot.slotData.booking.application) {
      const allowedTestCategories = this.appConfig.getAppConfig().journal.allowedTestCategories;
      if (allowedTestCategories.includes(slot.slotData.booking.application.testCategory)) {
        return true;
      }
    }
    return false;
  }

  isDateInPast = (dateTime: Date) => {
    const date = new Date(dateTime).setUTCHours(0, 0, 0, 0);
    const todaysDate = new Date().setUTCHours(0, 0, 0, 0);
    if (date < todaysDate) {
      return true;
    }
    return false;
  }
}
