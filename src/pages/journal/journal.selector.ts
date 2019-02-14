
import { JournalModel } from './journal.model';
import { isNil } from 'lodash';
import { DateTime, Duration } from '../../common/date-time';

export const getSlots = (journal: JournalModel) => journal.slots;

export const getSlotsOnSelectedDate = (journal: JournalModel) => journal.slots[journal.selectedDate];

export const getAvailableDays = (journal: JournalModel) => Object.keys(journal.slots);

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;

export const getLastRefreshed = (journal: JournalModel) => journal.lastRefreshed;

export const getLastRefreshedTime = (date: Date) => isNil(date) ? '--:--' : DateTime.at(date).format('hh:mma');

export const getSelectedDate = (journal: JournalModel) => journal.selectedDate;

export const canNavigateToPreviousDay = (journal: JournalModel): boolean => {
  const selectedDate = journal.selectedDate;
  const availableDays = getAvailableDays(journal);
  const previousDay = DateTime.at(selectedDate).add(-1, Duration.DAY).format('YYYY-MM-DD');

  return !isToday(selectedDate) && availableDays.includes(previousDay);
};

export const canNavigateToNextDay = (journal: JournalModel): boolean => {
  const availableDays = getAvailableDays(journal);
  const nextDay = DateTime.at(journal.selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');

  return availableDays.includes(nextDay);
};

export const isToday = (selectedDate: string): boolean => DateTime.now().format('YYYY-MM-DD') === selectedDate;
