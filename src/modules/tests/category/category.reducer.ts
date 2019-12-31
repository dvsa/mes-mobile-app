import  * as categoryActions from './category.actions';
import { createFeatureSelector } from '@ngrx/store';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

export const initialState: CategoryCode = null;

export const categoryReducer = (
  state = initialState,
  action: categoryActions.Types,
): CategoryCode => {
  switch (action.type) {
    case categoryActions.POPULATE_TEST_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export const getTestCategory = createFeatureSelector<CategoryCode>('category');
