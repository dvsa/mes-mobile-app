import { TestStatus } from './test-status.model';
import { createFeatureSelector } from '@ngrx/store';
import * as testStatusActions from './test-status.actions';

export const initialState = TestStatus.Booked;

export function testStatusReducer(
  state = initialState,
  action,
): TestStatus {
  switch (action.type) {
    case testStatusActions.TEST_STATUS_STARTED:
      return TestStatus.Started;
    case testStatusActions.TEST_STATUS_DECIDED:
      return TestStatus.Decided;
    case testStatusActions.TEST_STATUS_COMPLETED:
      return TestStatus.Completed;
    case testStatusActions.TEST_STATUS_SUBMITTED:
      return TestStatus.Submitted;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<TestStatus>('testStatus');
