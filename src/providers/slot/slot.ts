import { Injectable } from '@angular/core';
import { DeepDiff } from 'deep-diff';
import { flatten } from 'lodash';
import * as moment from 'moment';

import { SlotItem } from '../slot-selector/slot-item';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';

@Injectable()
export class SlotProvider {

  constructor() {}

  detectSlotChanges(slots: {[k: string]: SlotItem[]}, newJournal: ExaminerWorkSchedule): SlotItem[] {
    const newSlots = flatten([
      newJournal.testSlots || [],
      newJournal.nonTestActivities || [],
    ]);

    const oldJournalSlots: SlotItem[] = flatten(Object.values(slots));

    newSlots.sort((slotA, slotB) => slotA.slotDetail.start < slotB.slotDetail.start ? -1 : 1);
  
    return newSlots.map(newSlot => {
      const newSlotId = newSlot.slotDetail.slotId;

      const replacedJournalSlot = oldJournalSlots.find(oldSlot => oldSlot.slotData.slotDetail.slotId === newSlotId);
  
      let differenceFound = false;
      if (replacedJournalSlot) {
        differenceFound = replacedJournalSlot.hasSlotChanged;
        const differenceToSlot = DeepDiff(replacedJournalSlot.slotData, newSlot);
        if (Array.isArray(differenceToSlot) && differenceToSlot.some(change => change.kind === 'E')) {
          differenceFound = true;
        }
      }
  
      return new SlotItem(newSlot, differenceFound)
    });
  }

  /**
   * Extending the journal with empty days where there was no slots defined in the next 7 days
   * @param slots Journal slots
   * @returns Slots with additional empty days 
   */
  extendWithEmptyDays = (slots: {[k: string]: SlotItem[]}): {[k: string]: SlotItem[]} => {
    const emptyDays = {
      [moment().add(0, 'day').format('YYYY-MM-DD')]: [],
      [moment().add(1, 'day').format('YYYY-MM-DD')]: [],
      [moment().add(2, 'day').format('YYYY-MM-DD')]: [],
      [moment().add(3, 'day').format('YYYY-MM-DD')]: [],
      [moment().add(4, 'day').format('YYYY-MM-DD')]: [],
      [moment().add(5, 'day').format('YYYY-MM-DD')]: [],
      [moment().add(6, 'day').format('YYYY-MM-DD')]: [],
    };

    return {
      ...emptyDays,
      ...slots,
    }
  }

  /**
   * Slice the journal slots and get the slots only for the relevant days
   * | From regular working weekday we can see the next working weekday
   * | From Friday we can navigate through weekend till Monday
   * @param slots Journal slots
   * @returns Only the relevant slots
   */
  getRelevantSlots = (slots: {[k: string]: SlotItem[]}): {[k: string]: SlotItem[]} => {
    // we have to take in consideration if it's Friday so that we can navigate through the weekend till the next working weekday
    // if it's not Friday we just need to navigate to the next working weekday day
    const friday = 5;
    const daysAhead = moment().day() === friday ? 4 : 2;

    return Object.keys(slots).slice(0, daysAhead).reduce((acc: {[k: string]: SlotItem[]}, date) => ({
      ...acc,
      [date]: slots[date],
    }), {});
  }

  getSlotDate = (slot: any): string => moment(slot.slotData.slotDetail.start).format('YYYY-MM-DD');

}
