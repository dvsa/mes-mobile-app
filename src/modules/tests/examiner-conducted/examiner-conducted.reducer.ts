import  * as examinerConductedActions from './examiner-conducted.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: number | string = null;

export const examinerConductedReducer = (
  state = initialState,
  action: examinerConductedActions.Types,
): number | string => {
  switch (action.type) {
    case examinerConductedActions.SET_EXAMINER_CONDUCTED:
      return action.examinerConducted;
    default:
      return state;
  }
};

export const getExaminerConducted = createFeatureSelector<number>('examinerConducted');
