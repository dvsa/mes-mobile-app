import { TestStatus } from './test-status.model';
import { createFeatureSelector } from '@ngrx/store';
import * as testStatusActions from './test-status.actions';

export const initialState = {};

export function testStatusReducer(state = initialState, action: testStatusActions.Types): {} {
  switch (action.type) {
    case testStatusActions.SET_TEST_STATUS_BOOKED:
      return {
        ...state,
        [action.slotId]: TestStatus.Booked,
      };
    case testStatusActions.SET_TEST_STATUS_STARTED:
      return {
        ...state,
        [action.slotId]: TestStatus.Started,
      };
    case testStatusActions.SET_TEST_STATUS_DECIDED:
      return {
        ...state,
        [action.slotId]: TestStatus.Decided,
      };
    case testStatusActions.SET_TEST_STATUS_WRITE_UP:
      return {
        ...state,
        [action.slotId]: TestStatus.WriteUp,
      };
    case testStatusActions.SET_TEST_STATUS_AUTOSAVED:
      return {
        ...state,
        [action.slotId]: TestStatus.Autosaved,
      };
    case testStatusActions.SET_TEST_STATUS_COMPLETED:
      return {
        ...state,
        [action.slotId]: TestStatus.Completed,
      };
    case testStatusActions.SET_TEST_STATUS_SUBMITTED:
      return {
        ...state,
        [action.slotId]: TestStatus.Submitted,
      };
    case testStatusActions.SET_TEST_STATUS_DYNAMIC:
      return {
        ...state,
        [action.slotId]: action.testStatus as TestStatus,
      }
    default:
      return state;
  }
}

export const getTestStatus = createFeatureSelector<TestStatus>('testStatus');
