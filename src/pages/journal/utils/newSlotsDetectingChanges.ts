import { ExaminerWorkSchedule } from '../../../common/domain/DJournal';
import { SlotItem } from '../../../providers/slot-selector/slot-item';
import { DeepDiff } from 'deep-diff';

export default function(oldJournalSlots: SlotItem[], newJournal: ExaminerWorkSchedule): SlotItem[] {
  const newSlots = newJournal.testSlot;
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
