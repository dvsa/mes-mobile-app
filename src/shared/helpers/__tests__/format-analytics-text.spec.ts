import { TestsModel } from '../../../modules/tests/tests.model';
import * as fakeJournalActions from '../../../pages/fake-journal/fake-journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { formatAnalyticsText } from '../format-analytics-text';
import { AnalyticsEventCategories } from '../../../providers/analytics/analytics.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('formatAnalyticsText', () => {
  const initialState = {
    currentTest: { slotId: null },
    startedTests: {},
    testStatus: {},
    completedTests: [],
  };
  const eventString = 'analytics event';
  const slotId = 123;

  it('should prefix end to end practice tests with the correct text', () => {
    const state: TestsModel = { ...initialState };
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

  it('should prefix rekey tests with the correct text', () => {
    const state = { ...initialState };
    const action = new testsActions.StartTest(12345, TestCategory.B);
    const tests = testsReducer(state, action);
    tests.startedTests[tests.currentTest.slotId].rekey = true;

    const result = formatAnalyticsText(eventString, tests);

    expect(result).toBe(`${AnalyticsEventCategories.REKEY} - ${eventString}`);
  });

  it('should not prefix regular tests with any additional text', () => {
    const state = { ...initialState };
    const action = new testsActions.StartTest(slotId, TestCategory.B);
    const tests: TestsModel = testsReducer(state, action);

    const result = formatAnalyticsText(eventString, tests);

    expect(result).toBe(eventString);
  });

  it('should prefix delegated tests with the correct text', () => {
    const state = { ...initialState };
    const action = new testsActions.StartTest(slotId, TestCategory.BE, false, true);
    const tests = testsReducer(state, action);

    const localTests: TestsModel = {
      ...tests,
      startedTests: {
        ...tests.startedTests,
        [slotId]: {
          ...tests.startedTests[slotId],
          category: 'B+E',
          delegatedTest: true,
        },
      },
    };

    const result = formatAnalyticsText(eventString, localTests);

    expect(result).toBe(`${AnalyticsEventCategories.DELEGATED_TEST} - ${eventString}`);
  });

  it('should prefix delegated tests with the DelExRk even though test is rekey', () => {
    const state = { ...initialState };
    const action = new testsActions.StartTest(slotId, TestCategory.BE, true, true);
    const tests = testsReducer(state, action);

    const localTests: TestsModel = {
      ...tests,
      startedTests: {
        ...tests.startedTests,
        [slotId]: {
          ...tests.startedTests[slotId],
          category: 'B+E',
          delegatedTest: true,
          rekey: true,
        },
      },
    };

    const result = formatAnalyticsText(eventString, localTests);

    expect(result).toBe(`${AnalyticsEventCategories.DELEGATED_TEST} - ${eventString}`);
  });

});
