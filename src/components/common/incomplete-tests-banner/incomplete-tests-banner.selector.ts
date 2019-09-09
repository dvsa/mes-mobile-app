import { StoreModel } from '../../../shared/models/store.model';
import * as testsSelectors from '../../../modules/tests/tests.selector';
import { getStartableSlotIdsBeforeToday } from '../../../pages/journal/journal.selector';
import { DateTime } from '../../../shared/helpers/date-time';
import { SlotProvider } from '../../../providers/slot/slot';

export const getIncompleteTestsCount = (store: StoreModel, today: DateTime, slotProvider: SlotProvider): number => {
  const slotIdsBeforeToday = getStartableSlotIdsBeforeToday(store.journal, today, slotProvider);

  // includes tests with status of Started, Decided and WriteUp, but not unstarted rekeys
  const slotIdsOfInProgressTests = testsSelectors.getIncompleteTestsSlotIds(store.tests);

  const countOfInProgressTests = slotIdsBeforeToday.reduce((inProgressCount, slotId) => {
    if (slotIdsOfInProgressTests.includes(slotId.toString())) {
      return inProgressCount + 1;
    }
    return inProgressCount;
  }, 0);

  const unstartedRekeysCount = slotIdsBeforeToday.reduce((rekeyCount, slotId) => {
    if (Object.keys(store.tests.testStatus).includes(slotId.toString())) {
      return rekeyCount;
    }
    return rekeyCount + 1;
  }, 0);

  return countOfInProgressTests + unstartedRekeysCount;
};
