
import { JournalModel } from './journal.model';
import { isNil } from 'lodash';
import * as moment from 'moment';

export const getSlotsOnSelectedDate = (journal: JournalModel) => journal.slots[journal.selectedDate];

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;

export const getLastRefreshed = (journal: JournalModel) => journal.lastRefreshed;

export const getLastRefreshedTime = (date: Date) => isNil(date) ? '--:--' : moment(date).format('hh:mma');
