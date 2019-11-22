
import * as passCompletionActions from './pass-completion.actions';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatBEUniqueTypes.PassCompletion = null;

export function passCompletionCatBEReducer(
  state: CatBEUniqueTypes.PassCompletion = initialState,
  action: passCompletionActions.Types) {
  switch (action.type) {
    case passCompletionActions.POPULATE_PASS_COMPLETION:
      return {
        passCertificateNumber: null,
        provisionalLicenceProvided: null,
        code78Present: null,
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
    case passCompletionActions.CODE_78_PRESENT:
      return {
        ...state,
        code78Present: true,
      };
    case passCompletionActions.CODE_78_NOT_PRESENT:
      return {
        ...state,
        code78Present: false,
      };
    default:
      return state;
  }
}

export const getPassCompletion = createFeatureSelector<CatBEUniqueTypes.PassCompletion>('passCompletion');
