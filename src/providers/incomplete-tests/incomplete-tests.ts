import { Injectable } from '@angular/core';
import { SlotItem } from '../slot-selector/slot-item';
import { SlotSelectorProvider } from '../slot-selector/slot-selector';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';

@Injectable()
export class IncompleteTestsProvider {

  constructor(
    private slotSelector: SlotSelectorProvider,
  ) {}

  countIncompleteTests = (testsStatuses: { [slotId: string]: TestStatus }, slots: SlotItem[]): number => {
    if (!testsStatuses || !slots) {
      return;
    }

    let count = 0;
    slots.forEach((slot) => {
      if (this.isCatBTest(slot) &&
        this.slotSelector.isTestSlot(slot.slotData) &&
        testsStatuses[slot.slotData.slotDetail.slotId] !== TestStatus.Booked
      ) {
        count = count + 1;
      }
    });

    return count;
  }

  isCatBTest(slot: SlotItem) {
    return slot.slotData.booking.application.testCategory === 'B';
  }
}
