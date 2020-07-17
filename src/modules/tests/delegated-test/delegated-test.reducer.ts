import  * as delegatedTestActions from './delegated-test.actions';

import { createFeatureSelector } from '@ngrx/store';

export const initialState: boolean = false;

export const delegatedTestReducer = (
  state = initialState,
  action: delegatedTestActions.Types,
): boolean => {
  switch (action.type) {
    case delegatedTestActions.START_DELEGATED_TEST:
      return true;
    default:
      return state;
  }
};

export const getDelegatedTestIndicator = createFeatureSelector<boolean>('delegatedTest');
