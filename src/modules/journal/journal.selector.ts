import { JournalModel } from './journal.model';
import { flatten, isEmpty, isNil } from 'lodash';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { ApplicationReference } from '@dvsa/mes-test-schema/categories/common';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { formatApplicationReference } from '../../shared/helpers/formatters';

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
      if (DateTime.at(journal.selectedDate).isBefore(DateTime.at(slot)) && !isEmpty(journal.slots[slot])) {
        allowNavigationToFutureDate = true;
        return;
      }
    });
  return allowNavigationToFutureDate;
};

export const canNavigateToNextDay = (journal: JournalModel): boolean => {
  const nextDayAsDate = DateTime.at(journal.selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');
  const sevenDaysAhead = DateTime.at(DateTime.today()).add(7, Duration.DAY).format('YYYY-MM-DD');

  return (nextDayAsDate < sevenDaysAhead);
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
  journal: JournalModel,
  today: DateTime,
  slotProvider: SlotProvider,
): number[] => {
  const slots = getSlots(journal);
  const arrayOfDateStrings = Object.keys(slots).filter((date: string) => {
    const thisDate = new DateTime(date);
    return thisDate.isBefore(today.format('YYYY-MM-DD'));
  });
  return flatten(
    (arrayOfDateStrings.map(
      (date: string) => slots[date]
        .filter((slotItem: SlotItem) => slotProvider.canStartTest(slotItem.slotData))
        .filter((slotItem: SlotItem) => {
          if (!('booking' in slotItem.slotData)) { // NonTestActivity
            return false;
          }
          const testSlot = slotItem.slotData as TestSlot;
          const applicationReference = formatApplicationReference({
            applicationId: testSlot.booking.application.applicationId,
            bookingSequence: testSlot.booking.application.bookingSequence,
            checkDigit: testSlot.booking.application.checkDigit,
          } as ApplicationReference);
          // allow through if appRef is not already in completedTest list
          return !journal.completedTests
            .map((testResult: SearchResultTestSchema) => testResult.applicationReference)
            .includes(Number(applicationReference));
        }))),
  ).map((slot: SlotItem) => slot.slotData.slotDetail.slotId);
};

export const getCompletedTests = (journalModel: JournalModel): SearchResultTestSchema[] => {
  return journalModel.completedTests;
};
