
import { JournalModel } from './journal.model';

export const getTestSlots = (journal: JournalModel) => journal.testSlot;

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;