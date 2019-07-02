import { Injectable } from '@angular/core';
import { DeepDiff } from 'deep-diff';
import { flatten, times } from 'lodash';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { SlotItem } from '../slot-selector/slot-item';
import { ExaminerWorkSchedule } from '@dvsa/mes-journal-schema';
import { AppConfigProvider } from '../app-config/app-config';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { SlotHasChanged } from './slot.actions';
import { DateTimeProvider } from '../date-time/date-time';

@Injectable()
export class SlotProvider {

  constructor(
    private store$: Store<StoreModel>,
    public appConfigProvider: AppConfigProvider,
    private dateTimeProvider: DateTimeProvider,
  ) {}

  detectSlotChanges(slots: {[k: string]: SlotItem[]}, newJournal: ExaminerWorkSchedule): SlotItem[] {
    const newSlots = flatten([
      newJournal.testSlots || [],
      newJournal.nonTestActivities || [],
    ]);

    const oldJournalSlots: SlotItem[] = flatten(Object.values(slots));

    newSlots.sort((slotA, slotB) => slotA.slotDetail.start < slotB.slotDetail.start ? -1 : 1);

    return newSlots.map((newSlot) => {
      const newSlotId = newSlot.slotDetail.slotId;

      const replacedJournalSlot = oldJournalSlots.find(oldSlot => oldSlot.slotData.slotDetail.slotId === newSlotId);

      let differenceFound = false;
      if (replacedJournalSlot) {
        differenceFound = replacedJournalSlot.hasSlotChanged;
        const differenceToSlot = DeepDiff(replacedJournalSlot.slotData, newSlot);
        if (Array.isArray(differenceToSlot) && differenceToSlot.some(change => change.kind === 'E')) {
          this.store$.dispatch(new SlotHasChanged(newSlotId));
          differenceFound = true;
        }
      }

      return new SlotItem(newSlot, differenceFound);
    });
  }

  /**
   * Extends the journal with empty days where there was no slots defined in the next 7 days
   * @param slots Journal slots
   * @returns Slots with additional empty days
   */
  extendWithEmptyDays = (slots: {[k: string]: SlotItem[]}): {[k: string]: SlotItem[]} => {
    const numberOfDaysToView = this.appConfigProvider.getAppConfig().journal.numberOfDaysToView;

    const days = times(
      numberOfDaysToView,
      (d: number): string => this.dateTimeProvider.now().add(d, Duration.DAY).format('YYYY-MM-DD'),
    );
    const emptyDays = days.reduce((days: {[k: string]: SlotItem[]}, day: string) => ({ ...days, [day]: [] }), {});

    return {
      ...emptyDays,
      ...slots,
    };
  }

  /**
   * @param slots Journal slots
   * @returns Only the relevant slots
   */
  getRelevantSlots = (slots: {[k: string]: SlotItem[]}): {[k: string]: SlotItem[]} => {
    return Object.keys(slots)
      .reduce(
        (acc: {[k: string]: SlotItem[]}, date) => ({
          ...acc,
          [date]: slots[date],
        }),
        {},
      );
  }

  getSlotDate = (slot: SlotItem): string => DateTime.at(slot.slotData.slotDetail.start).format('YYYY-MM-DD');

}
