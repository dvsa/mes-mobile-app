import { JournalSlot } from '../domain/JournalSlot';
import { ExaminerWorkSchedule } from '../../../common/domain/DJournal';

export default function(oldJournalSlots: JournalSlot[], newJournal: ExaminerWorkSchedule): JournalSlot[] {
  const newSlots = newJournal.testSlot;
  return newSlots.map(newSlot => (new JournalSlot(new Date(), newSlot)));
}
