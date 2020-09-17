import  * as examinerBookedActions from './examiner-booked.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: number | string = null;

export const examinerBookedReducer = (
  state = initialState,
  action: examinerBookedActions.Types,
): number | string => {
  switch (action.type) {
    case examinerBookedActions.SET_EXAMINER_BOOKED:
      return action.examinerBooked;
    default:
      return state;
  }
};

export const getExaminerBooked = createFeatureSelector<number>('examinerBooked');
