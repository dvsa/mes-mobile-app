import { JournalModel } from "../journal/journal.model";

export const getTestSlots = (journal: JournalModel) => journal.data.testSlot;

// TODO: replace any with TestSlot types when we have the data structure
export const getSlotById = (testSlots: any[], slotId: number) => {
  if (!testSlots) return;
  return testSlots.find(testSlot => testSlot.slotDetail.slotId === slotId);
}
