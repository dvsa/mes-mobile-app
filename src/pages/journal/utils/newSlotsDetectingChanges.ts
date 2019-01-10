import { ExaminerWorkSchedule } from '../../../common/domain/DJournal';
import deepDiff from 'deep-diff';
import { SlotItem } from '../../../providers/slot-selector/slot-item';

export default function(oldJournalSlots: SlotItem[], newJournal: ExaminerWorkSchedule): SlotItem[] {
  const newSlots = newJournal.testSlot;
  return newSlots.map(newSlot => {
    const newSlotId = newSlot.slotDetail.slotId;
    const replacedJournalSlot = oldJournalSlots.find(oldSlot => oldSlot.slotData.slotDetail.slotId === newSlotId);

    let differenceFound = false;
    if (replacedJournalSlot) {
      const differenceToSlot = deepDiff(replacedJournalSlot.slotData, newSlot);
      if (Array.isArray(differenceToSlot) && differenceToSlot.some(change => change.kind === 'E')) {
        differenceFound = true;
      }
    }

    return new SlotItem(newSlot, differenceFound)
  });
}
