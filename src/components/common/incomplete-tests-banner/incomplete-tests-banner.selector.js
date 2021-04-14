import * as testsSelectors from '../../../modules/tests/tests.selector';
import { getPermittedSlotIdsBeforeToday } from '../../../modules/journal/journal.selector';
export var getIncompleteTestsCount = function (journal, tests, today, slotProvider) {
    /*
    * Incomplete tests are defined as those tests that:
    *  - are prior to today
    *  - the user is permitted to start (from app config)
    *  - haven't been submitted/completed
    *  - are yet to be rekeyed
    *
    * To count the number of incomplete tests, we first get an array of slot IDs of tests that this
    * user is (or was) permitted to start. Test status is not considered, so this list could include
    * completed tests.
    *
    * Then we loop through that list determine if the the test is an outstanding rekey (count it) or
    * an incomplete tests (count it too)
    */
    var slotIdsBeforeToday = getPermittedSlotIdsBeforeToday(journal, today, slotProvider);
    // includes tests with status of Started, Decided and WriteUp, but not unstarted rekeys
    var slotIdsOfInProgressTests = testsSelectors.getIncompleteTestsSlotIds(tests);
    var slotIdsOfAllStartedTests = Object.keys(tests.testStatus);
    return slotIdsBeforeToday.reduce(function (count, slotId) {
        // tests that are in the list of in progress tests are incomplete
        if (slotIdsOfInProgressTests.includes(slotId.toString())) {
            return count + 1;
        }
        // tests that are not in the list of started tests are also incomplete
        if (!slotIdsOfAllStartedTests.includes(slotId.toString())) {
            return count + 1;
        }
        return count;
    }, 0);
};
//# sourceMappingURL=incomplete-tests-banner.selector.js.map