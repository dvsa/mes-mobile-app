import * as passCompletionActions from './pass-completion.actions';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

import { createFeatureSelector } from '@ngrx/store';

export const initialState:
  CatBUniqueTypes.PassCompletion |
  CatBEUniqueTypes.PassCompletion |
  CatCUniqueTypes.PassCompletion = {
    passCertificateNumber: null,
    provisionalLicenceProvided: null,
  };

export const passCompletionReducer = (state = initialState, action: passCompletionActions.Types) => {
  switch (action.type) {
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

// Can't do multi line type assertion
// tslint:disable-next-line:max-line-length
export const getPassCompletion = createFeatureSelector<CatBUniqueTypes.PassCompletion | CatBEUniqueTypes.PassCompletion | CatCUniqueTypes.PassCompletion>('passCompletion');
