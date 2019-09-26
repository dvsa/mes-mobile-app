import  * as schemaVersionActions from './schema-version.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: string = '';

export const schemaVersionReducer = (
  state = initialState,
  action: schemaVersionActions.Types,
): string => {
  switch (action.type) {
    case schemaVersionActions.POPULATE_TEST_SCHEMA_VERSION:
      return action.payload;
    default:
      return state;
  }
};

export const getTestSchemaVersion = createFeatureSelector<string>('schemaVersion');
