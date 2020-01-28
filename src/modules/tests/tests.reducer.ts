import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Action, createFeatureSelector } from '@ngrx/store';
import { get } from 'lodash';

import * as journalActions from '../../modules/journal/journal.actions';
import * as testsActions from './tests.actions';
import { TestsModel } from './tests.model';
import * as testStatusActions from './test-status/test-status.actions';
import { testStatusReducer } from './test-status/test-status.reducer';
import * as fakeJournalActions from '../../pages/fake-journal/fake-journal.actions';
import { testReportPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { testsReducerFactory } from './tests-reducer-factory';

export const initialState: TestsModel = {
  currentTest: { slotId: null },
  startedTests: {},
  testStatus: {},
};

/**
 * Handles actions relating to a particular test by finding which test the actions apply to
 * and applying a test capture domain concept reducer against that test's portion of the state.
 * @param state Test state for all tests
 * @param action The action to modify the state
 */
export function testsReducer(
  state = initialState,
  action: testsActions.Types | journalActions.JournalActionTypes | fakeJournalActions.Types,
): TestsModel {

  const slotId = deriveSlotId(state, action);
  const category = deriveCategory(state, action, slotId);
  switch (action.type) {
    case testsActions.LOAD_PERSISTED_TESTS_SUCCESS:
      return (<testsActions.LoadPersistedTestsSuccess>action).tests;
    case testsActions.START_TEST_REPORT_PRACTICE_TEST:
      return slotId ? createStateObject(removeTest(state, slotId), action, slotId, category) : state;
    case fakeJournalActions.START_E2E_PRACTICE_TEST:
      return slotId ? createStateObject(removeTest(state, slotId), action, slotId, category) : state;
    default:
      return slotId ? createStateObject(state, action, slotId, category) : state;
  }
}

const deriveSlotId = (state: TestsModel, action: Action): string | null => {
  if (action instanceof testsActions.StartTestReportPracticeTest) {
    return testReportPracticeSlotId;
  }

  if (action instanceof testsActions.StartTest
    || action instanceof testsActions.ActivateTest
    || action instanceof fakeJournalActions.StartE2EPracticeTest) {
    return `${action.slotId}`;
  }

  return (state.currentTest && state.currentTest.slotId) ? state.currentTest.slotId : null;
};

const deriveCategory = (state: TestsModel, action: Action, slotId: string | null): TestCategory => {
  if (action instanceof testsActions.StartTest
    || action instanceof testsActions.ActivateTest
    || action instanceof testsActions.StartTestReportPracticeTest
    || action instanceof fakeJournalActions.StartE2EPracticeTest) {
    return action.category;
  }

  return get(state.startedTests[slotId], 'category', null);
};

const createStateObject = (state: TestsModel, action: Action, slotId: string, category: TestCategory): TestsModel => {
  return {
    ...state,
    startedTests: {
      ...state.startedTests,
      [slotId]: {
        ...testsReducerFactory(category, action, state.startedTests[slotId]),
      },
    },
    currentTest: {
      slotId,
    },
    testStatus: testStatusReducer(state.testStatus, action as testStatusActions.Types),
  };
};

const removeTest = (state: TestsModel, slotId: string): TestsModel => {
  const { [slotId]: removedStartedTest, ...updatedStartedTests } = state.startedTests;
  const { [slotId]: removedTestStatus, ...updatedTestStatus } = state.testStatus;
  return {
    ...state,
    currentTest: {
      ...initialState.currentTest,
    },
    startedTests: updatedStartedTests,
    testStatus: updatedTestStatus,
  };
};

export const getTests = createFeatureSelector<TestsModel>('tests');
