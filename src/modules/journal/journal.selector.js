import { flatten, isEmpty, isNil } from 'lodash';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { formatApplicationReference } from '../../shared/helpers/formatters';
export var getSlots = function (journal) { return journal.slots; };
export var getSlotsOnSelectedDate = function (journal) { return journal.slots[journal.selectedDate]; };
export var getAvailableDays = function (journal) { return Object.keys(journal.slots); };
export var getError = function (journal) { return journal.error; };
export var getIsLoading = function (journal) { return journal.isLoading; };
export var getLastRefreshed = function (journal) { return journal.lastRefreshed; };
export var getLastRefreshedTime = function (date) { return isNil(date) ? '--:--' : DateTime.at(date).format('hh:mma'); };
export var getSelectedDate = function (journal) { return journal.selectedDate; };
export var canNavigateToPreviousDay = function (journal, today) {
    var selectedDate = journal.selectedDate;
    var lookbackLimit = today.subtract(14, Duration.DAY).format('YYYY-MM-DD');
    return selectedDate > lookbackLimit;
};
export var hasSlotsAfterSelectedDate = function (journal) {
    var allowNavigationToFutureDate = false;
    Object.keys(journal.slots)
        .forEach(function (slot) {
        if (DateTime.at(journal.selectedDate).isBefore(DateTime.at(slot)) && !isEmpty(journal.slots[slot])) {
            allowNavigationToFutureDate = true;
            return;
        }
    });
    return allowNavigationToFutureDate;
};
export var canNavigateToNextDay = function (journal) {
    var nextDayAsDate = DateTime.at(journal.selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');
    var sevenDaysAhead = DateTime.at(DateTime.today()).add(7, Duration.DAY).format('YYYY-MM-DD');
    return (nextDayAsDate < sevenDaysAhead);
};
export var getAllSlots = function (journal) {
    var slotArray = [];
    Object.values(journal.slots)
        .forEach(function (dayOfSlots) {
        dayOfSlots.forEach(function (slot) {
            slotArray.push(slot);
        });
    });
    return slotArray;
};
export var getPermittedSlotIdsBeforeToday = function (journal, today, slotProvider) {
    var slots = getSlots(journal);
    var arrayOfDateStrings = Object.keys(slots).filter(function (date) {
        var thisDate = new DateTime(date);
        return thisDate.isBefore(today.format('YYYY-MM-DD'));
    });
    return flatten((arrayOfDateStrings.map(function (date) { return slots[date]
        .filter(function (slotItem) { return slotProvider.canStartTest(slotItem.slotData); })
        .filter(function (slotItem) {
        if (!('booking' in slotItem.slotData)) { // NonTestActivity
            return false;
        }
        var testSlot = slotItem.slotData;
        var applicationReference = formatApplicationReference({
            applicationId: testSlot.booking.application.applicationId,
            bookingSequence: testSlot.booking.application.bookingSequence,
            checkDigit: testSlot.booking.application.checkDigit,
        });
        // allow through if appRef is not already in completedTest list
        return !journal.completedTests
            .map(function (testResult) { return testResult.applicationReference; })
            .includes(Number(applicationReference));
    }); }))).map(function (slot) { return slot.slotData.slotDetail.slotId; });
};
export var getCompletedTests = function (journalModel) {
    return journalModel.completedTests;
};
//# sourceMappingURL=journal.selector.js.map