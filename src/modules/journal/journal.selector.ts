import { JournalModel } from './journal.model';
import { flatten, isEmpty, isNil } from 'lodash';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';

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

export const hasSlotsAfterSelectedDate = (journal: JournalModel): boolean => {
  let allowNavigationToFutureDate: boolean = false;

  Object.keys(journal.slots)
    .forEach((slot: string) => {
      if (new Date(journal.selectedDate) < new Date(slot) && !isEmpty(journal.slots[slot])) {
        allowNavigationToFutureDate = true;
      }
    });
  return allowNavigationToFutureDate;
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

  return nextDayAsDate < dayAfterTomorrowAsDate || traverseWeekend || hasSlotsAfterSelectedDate(journal);
};

export const getAllSlots = (journal: JournalModel): SlotItem[] => {
  const slotArray: SlotItem[] = [];
  Object.values(journal.slots)
    .forEach((dayOfSlots) => {
      dayOfSlots.forEach((slot) => {
        slotArray.push(slot);
      });
    });
  return slotArray;
};

export const getPermittedSlotIdsBeforeToday = (
  journal: JournalModel, today: DateTime, slotProvider: SlotProvider): number[] => {
  const slots = getSlots(journal);
  const arrayOfDateStrings = Object.keys(slots).filter((date: string) => {
    const thisDate = new DateTime(date);
    return thisDate.isBefore(today.format('YYYY-MM-DD'));
  });
  return flatten((arrayOfDateStrings.map(date => slots[date].filter(slot => slotProvider.canStartTest(slot.slotData))
    .map(slot => slot.slotData.slotDetail.slotId))));
};
