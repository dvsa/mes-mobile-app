import  * as categoryActions from './category.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: string = '';

export const categoryReducer = (
  state = initialState,
  action: categoryActions.Types,
): string => {
  switch (action.type) {
    case categoryActions.POPULATE_TEST_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export const getTestCategory = createFeatureSelector<string>('category');
