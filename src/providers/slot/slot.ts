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
        const differenceToSlot = DeepDiff(replacedJournalSlot.slotData, newSlot);
        if (Array.isArray(differenceToSlot) && differenceToSlot.some(change => change.kind === 'E')) {
          differenceFound = true;
        }
      }
  
      return new SlotItem(newSlot, differenceFound)
    });
  }

  getSlotDate = (slot: any): string => moment(slot.slotData.slotDetail.start).format('YYYY-MM-DD');

}
