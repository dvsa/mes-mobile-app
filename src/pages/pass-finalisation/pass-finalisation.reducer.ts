import * as passFinalisationActions from './pass-finalisation.actions';
import { PassCompletion } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';

const initialState: PassCompletion = {
  provisionalLicenceProvided: null,
  passCertificateNumber: null,
};

export const passFinalisationReducer = (state = initialState, action: passFinalisationActions.Types) => {
  switch (action.type) {
    case passFinalisationActions.PASS_CERTIFICATE_NUMBER_CHANGED:
      return {
        ...state,
        passCertificateNumber: action.passCertificateNumber,
      };
    default:
      return state;
  }
};

export const getPassCompletion = createFeatureSelector<PassCompletion>('passCompletion');
