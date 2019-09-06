import { StoreModel } from '../../../shared/models/store.model';
import * as testsSelectors from '../../../modules/tests/tests.selector';
import { getSlotIdsBeforeToday } from '../../../pages/journal/journal.selector';
import { DateTime } from '../../../shared/helpers/date-time';

export const getIncompleteTestsCount = (store: StoreModel, today: DateTime): number => {
  const slotIdsBeforeToday = getSlotIdsBeforeToday(store.journal, today);

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
