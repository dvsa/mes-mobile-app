
import { JournalModel } from './journal.model';
import { isNil } from 'lodash';
import moment from 'moment';

export const getTestSlots = (journal: JournalModel) => journal.slots;

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;

export const getLastRefreshed = (journal: JournalModel) => journal.lastRefreshed;

export const getLastRefreshedTime = (date: Date) => isNil(date) ? '--:--' : moment(date).format('hh:mma');
