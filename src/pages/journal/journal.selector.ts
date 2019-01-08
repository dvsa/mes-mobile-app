
import { JournalModel } from './journal.model';

export const getTestSlots = (journal: JournalModel) => journal.slots;

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;

export const getLastRefreshed = (journal: JournalModel) => journal.lastRefreshed;
