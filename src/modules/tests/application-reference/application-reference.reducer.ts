import { ApplicationReference } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as applicationReferenceActions from './application-reference.actions';

export const initialState: ApplicationReference = {
  applicationId: null,
  bookingSequence: null,
  checkDigit: null,
};

export function applicationReferenceReducer(
  state = initialState,
  action: applicationReferenceActions.Types,
): ApplicationReference {
  switch (action.type) {

    // TODO: Deal with a more specific action here so that we don't need to introduce logic to the reducer
    case applicationReferenceActions.POPULATE_APPLICATION_REFERENCE:
      console.log('application reference action', action);
      return {
        applicationId: action.payload.applicationId,
        bookingSequence: action.payload.bookingSequence,
        checkDigit: action.payload.checkDigit,
      };
  }
  return state;
}

export const getApplicationReference = createFeatureSelector<ApplicationReference>('applicationReference');
