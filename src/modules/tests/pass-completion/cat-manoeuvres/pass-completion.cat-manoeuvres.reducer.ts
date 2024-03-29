import { createFeatureSelector } from '@ngrx/store';
import { PassCompletion } from '@dvsa/mes-test-schema/categories/CM';
import * as passCompletionActions from '../pass-completion.actions';

export const initialState: PassCompletion = {
  passCertificateNumber: null,
};

export const passCompletionCatManoeuvresReducer = (
  state = initialState,
  action: passCompletionActions.Types,
): PassCompletion => {
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
