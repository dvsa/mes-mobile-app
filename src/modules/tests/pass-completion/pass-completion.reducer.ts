import * as passCompletionActions from './pass-completion.actions';
import { PassCompletion } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: PassCompletion = null;

export const passCompletionReducer = (state = initialState, action: passCompletionActions.Types) => {
  switch (action.type) {
    case passCompletionActions.POPULATE_PASS_COMPLETION:
      return {
        passCertificateNumber: null,
        provisionalLicenceProvided: false,
      };
    case passCompletionActions.PASS_CERTIFICATE_NUMBER_CHANGED:
      return {
        ...state,
        passCertificateNumber: action.passCertificateNumber,
      };
    case passCompletionActions.PROVISIONAL_LICENSE_RECEIVED:
      return {
        ...state,
        provisionalLicenceProvided: true,
      };
    case passCompletionActions.PROVISIONAL_LICENSE_NOT_RECEIVED:
      return {
        ...state,
        provisionalLicenceProvided: false,
      };
    default:
      return state;
  }
};

export const getPassCompletion = createFeatureSelector<PassCompletion>('passCompletion');
