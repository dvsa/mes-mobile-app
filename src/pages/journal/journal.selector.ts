
import { JournalModel } from './journal.model';
import { isNil } from 'lodash';
import * as moment from 'moment';

export const getSlots = (journal: JournalModel) => journal.slots;

export const getSlotsOnSelectedDate = (journal: JournalModel) => journal.slots[journal.selectedDate];

export const getAvailableDays = (journal: JournalModel) => Object.keys(journal.slots);

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;

export const getLastRefreshed = (journal: JournalModel) => journal.lastRefreshed;

export const getLastRefreshedTime = (date: Date) => isNil(date) ? '--:--' : moment(date).format('hh:mma');

export const getSelectedDate = (journal: JournalModel) => journal.selectedDate;

export const canNavigateToPreviousDay = (journal: JournalModel): boolean => {
  const selectedDate = journal.selectedDate;
  const availableDays = getAvailableDays(journal);
  const previousDay = moment(selectedDate).add(-1, 'day').format('YYYY-MM-DD');

  return !isSelectedDateToday(selectedDate) && availableDays.includes(previousDay);
};

export const canNavigateToNextDay = (journal: JournalModel): boolean => {
  const availableDays = getAvailableDays(journal);
  const nextDay = moment(journal.selectedDate).add(1, 'day').format('YYYY-MM-DD');
  
  return availableDays.includes(nextDay);
};

export const isSelectedDateToday = (selectedDate: string): boolean => moment().format('YYYY-MM-DD') === selectedDate;