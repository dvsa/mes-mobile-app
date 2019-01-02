
import { JournalModel } from './journal.model';

export const getTestSlots = (journal: JournalModel) => journal.data.testSlot;

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;