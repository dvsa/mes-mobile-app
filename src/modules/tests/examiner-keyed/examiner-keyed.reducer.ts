import  * as examinerKeyedActions from './examiner-keyed.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: number = null;

export const examinerKeyedReducer = (
  state = initialState,
  action: examinerKeyedActions.Types,
): number => {
  switch (action.type) {
    case examinerKeyedActions.SET_EXAMINER_KEYED:
      return action.examinerKeyed;
    default:
      return state;
  }
};

export const getExaminerKeyed = createFeatureSelector<number>('examinerKeyed');
