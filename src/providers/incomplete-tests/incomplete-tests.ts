import { Injectable } from '@angular/core';
import { SlotItem } from '../slot-selector/slot-item';
import { SlotSelectorProvider } from '../slot-selector/slot-selector';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';
import { AppConfigProvider } from '../app-config/app-config';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { getAllSlots } from '../../pages/journal/journal.selector';
import { getJournalState } from '../../pages/journal/journal.reducer';
import { getAllTestStatuses } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { Observable } from 'rxjs/Observable';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { has } from 'lodash';

@Injectable()
export class IncompleteTestsProvider {

  constructor(
    public appConfig: AppConfigProvider,
    private slotSelector: SlotSelectorProvider,
    private store$: Store<StoreModel>,
  ) { }

  calculateIncompleteTests = (): Observable<number> => {
    return this.store$.pipe(
      select(getJournalState),
      map(getAllSlots),
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          map(getAllTestStatuses),
        ),
      ),
      map(([slots, testStatuses]) => {
        return this.countIncompleteTests(slots, testStatuses);
      }),
    );
  }

  countIncompleteTests(slots: SlotItem[], testStatuses: { [slotId: string]: TestStatus; }): number {
    if (!testStatuses || !slots) {
      return 0;
    }

    const reducer = (sum, slot) => sum + (
      this.canStartTest(slot) &&
      this.isDateInPast(slot.slotData.slotDetail.start) &&
      this.slotSelector.isTestSlot(slot.slotData) &&
      testStatuses[slot.slotData.slotDetail.slotId] !== TestStatus.Submitted &&
      testStatuses[slot.slotData.slotDetail.slotId] !== TestStatus.Completed);
    return slots.reduce(reducer, 0) as number;
  }

  canStartTest(slot: SlotItem) {
    if (!slot || !slot.slotData) {
      return false;
    }
    const { slotData } = slot;
    if (has(slotData, 'booking') && (<TestSlot>slotData).booking.application) {
      const allowedTestCategories = this.appConfig.getAppConfig().journal.allowedTestCategories;
      if (allowedTestCategories.includes((<TestSlot>slotData).booking.application.testCategory)) {
        return true;
      }
    }
    return false;
  }

  isDateInPast = (dateTime: Date) => {
    const date = new Date(dateTime).setUTCHours(0, 0, 0, 0);
    const todaysDate = new Date().setUTCHours(0, 0, 0, 0);
    return date < todaysDate;
  }
}
