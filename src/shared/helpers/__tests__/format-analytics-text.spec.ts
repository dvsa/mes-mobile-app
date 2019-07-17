import { TestsModel } from '../../../modules/tests/tests.model';
import * as fakeJournalActions from '../../../pages/fake-journal/fake-journal.actions';
import * as journalActions from '../../../pages/journal/journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { formatAnalyticsText } from '../format-analytics-text';
import { AnalyticsEventCategories } from '../../../providers/analytics/analytics.model';

describe('formatAnalyticsText', () => {
  const initialState = {
    currentTest: { slotId: null },
    startedTests: {},
    testStatus: {},
  };
  const eventString = 'analytics event';
  const slotId = 123;

  it('should prefix end to end practice tests with the correct text', () => {
    const state = { ...initialState };
    const action = new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId);
    const tests: TestsModel = testsReducer(state, action);

    const result = formatAnalyticsText(eventString, tests);

    expect(result).toBe(`${AnalyticsEventCategories.PRACTICE_MODE} - ${eventString}`);
  });

  it('should prefix practice tests with the correct text', () => {
    const state = { ...initialState };
    const action = new testsActions.StartTestReportPracticeTest(testReportPracticeSlotId);
    const tests: TestsModel = testsReducer(state, action);

    const result = formatAnalyticsText(eventString, tests);

    expect(result).toBe(`${AnalyticsEventCategories.PRACTICE_TEST} - ${eventString}`);
  });

  it('should not prefix regular tests with any additional text', () => {
    const state = { ...initialState };
    const action = new journalActions.StartTest(slotId);
    const tests: TestsModel = testsReducer(state, action);

    const result = formatAnalyticsText(eventString, tests);

    expect(result).toBe(eventString);
  });

});
