import { StoreModel } from '../../../shared/models/store.model';
import * as testsSelectors from '../../../modules/tests/tests.selector';
import { getSlotIdsBeforeToday } from '../../../pages/journal/journal.selector';
import { DateTime } from '../../../shared/helpers/date-time';

export const getIncompleteTestsCount = (store: StoreModel, today: DateTime): number => {
  // includes tests with status of Started, Decided and WriteUp, but not unstarted rekeys
  const countOfInProgressTests = testsSelectors.getIncompleteTestsCount(store.tests);

  const slotIdsBeforeToday = getSlotIdsBeforeToday(store.journal, today);

  const unstartedRekeysCount = slotIdsBeforeToday.reduce((rekeyCount, slotId) => {
    if (Object.keys(store.tests.testStatus).includes(slotId.toString())) {
      return rekeyCount;
    }
    return rekeyCount + 1;
  }, 0);

  return countOfInProgressTests + unstartedRekeysCount;
};
