import { ApplicationReference } from '@dvsa/mes-test-schema/categories/common';
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
    case applicationReferenceActions.POPULATE_APPLICATION_REFERENCE:
      return {
        applicationId: action.payload.applicationId,
        bookingSequence: action.payload.bookingSequence,
        checkDigit: action.payload.checkDigit,
      };
  }
  return state;
}

export const getApplicationReference = createFeatureSelector<ApplicationReference>('applicationReference');
