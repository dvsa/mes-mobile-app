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

  extendWithEmptyDays = (slots: {[k: string]: SlotItem[]}) => {
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

  getRelevantDays = (slots: {[k: string]: SlotItem[]}) => {
    const friday = 5;
    const daysAhead = moment().day() === friday ? 4 : 2;

    const result = Object.keys(slots).slice(0, daysAhead).reduce((acc: {[k: string]: SlotItem[]}, date) => ({
      ...acc,
      [date]: slots[date],
    }), {});

    return result;
  }

  getSlotDate = (slot: any): string => moment(slot.slotData.slotDetail.start).format('YYYY-MM-DD');

}
