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
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<TestStatus>('testStatus');
