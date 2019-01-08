import { JournalSlot } from '../domain/JournalSlot';
import { ExaminerWorkSchedule } from '../../../common/domain/DJournal';
import diff from 'deep-diff';

export default function(oldJournalSlots: JournalSlot[], newJournal: ExaminerWorkSchedule): JournalSlot[] {
  const newSlots = newJournal.testSlot;
  return newSlots.map(newSlot => {
    const newSlotId = newSlot.slotDetail.slotId;
    const replacedJournalSlot = oldJournalSlots.find(oldSlot => oldSlot.slot.slotDetail.slotId === newSlotId);

    let differenceFound = false;
    if (replacedJournalSlot) {
      const differenceToSlot = diff(replacedJournalSlot.slot, newSlot);
      if (Array.isArray(differenceToSlot) && differenceToSlot.some(change => change.kind === 'E')) {
        differenceFound = true;
      }
    }

    return new JournalSlot(newSlot, differenceFound)
  });
}
