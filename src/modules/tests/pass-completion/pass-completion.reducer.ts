import * as passCompletionActions from './pass-completion.actions';
import { PassCompletion } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';

const initialState: PassCompletion = {
  provisionalLicenceProvided: null,
  passCertificateNumber: null,
};

export const passCompletionReducer = (state = initialState, action: passCompletionActions.Types) => {
  switch (action.type) {
    case passCompletionActions.PASS_CERTIFICATE_NUMBER_CHANGED:
      return {
        ...state,
        passCertificateNumber: action.passCertificateNumber,
      };
    default:
      return state;
  }
};

export const getPassCompletion = createFeatureSelector<PassCompletion>('passCompletion');
