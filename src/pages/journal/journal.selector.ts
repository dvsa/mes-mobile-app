
import { JournalModel } from './journal.model';
import { isNil } from 'lodash';
import { DateTime, Duration } from '../../shared/helpers/date-time';

export const getSlots = (journal: JournalModel) => journal.slots;

export const getSlotsOnSelectedDate = (journal: JournalModel) => journal.slots[journal.selectedDate];

export const getAvailableDays = (journal: JournalModel) => Object.keys(journal.slots);

export const getError = (journal: JournalModel) => journal.error;

export const getIsLoading = (journal: JournalModel) => journal.isLoading;

export const getLastRefreshed = (journal: JournalModel) => journal.lastRefreshed;

export const getLastRefreshedTime = (date: Date) => isNil(date) ? '--:--' : DateTime.at(date).format('hh:mma');

export const getSelectedDate = (journal: JournalModel) => journal.selectedDate;

export const canNavigateToPreviousDay = (journal: JournalModel, today: DateTime): boolean => {
  const selectedDate = journal.selectedDate;
  const lookbackLimit = today.subtract(14, Duration.DAY).format('YYYY-MM-DD');

  return selectedDate > lookbackLimit;
};

export const canNavigateToNextDay = (journal: JournalModel): boolean => {
  let traverseWeekend = false;
  const nextDayAsDate = DateTime.at(journal.selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');
  const dayAfterTomorrowAsDate = DateTime.at(DateTime.today()).add(2, Duration.DAY).format('YYYY-MM-DD');
  const nextDayAsDay = DateTime.at(journal.selectedDate).add(1, Duration.DAY).day();

  // if the current day is a Friday(5) or Saturday(6), allow navigation to the Monday.
  if ((DateTime.at(DateTime.today()).day() === 5 || DateTime.at(DateTime.today()).day() === 6) && nextDayAsDay !== 2) {
    traverseWeekend = true;
  }

  return nextDayAsDate < dayAfterTomorrowAsDate || traverseWeekend;
};
