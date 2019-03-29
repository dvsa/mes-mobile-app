import { ApplicationReference } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as testOutcomeActions from '../../../pages/journal/components/test-outcome/test-outcome.actions';
import { has } from 'lodash';

export const initialState: ApplicationReference = {
  applicationId: null,
  bookingSequence: null,
  checkDigit: null,
};

export function applicationReferenceReducer(
  state = initialState,
  action: testOutcomeActions.Types,
): ApplicationReference {
  switch (action.type) {
    case testOutcomeActions.TEST_OUTCOME_START_TEST:
      if (!has(action, 'payload.booking.application')) {
        return null;
      }
      return {
        applicationId: action.payload.booking.application.applicationId,
        bookingSequence: action.payload.booking.application.bookingSequence,
        checkDigit: action.payload.booking.application.checkDigit,
      };
  }
  return state;
}

export const getApplicationReference = createFeatureSelector<ApplicationReference>('applicationReference');
