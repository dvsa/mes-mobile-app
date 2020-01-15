import * as passCompletionActionsCatC from './pass-completion.cat-c.actions';
import * as passCompletionActions from '../pass-completion.actions';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C/index';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatCUniqueTypes.PassCompletion = null;

export const passCompletionCatCReducer = (
  state = initialState,
  action: passCompletionActionsCatC.Types | passCompletionActions.Types,
): CatCUniqueTypes.PassCompletion => {
  switch (action.type) {
    case passCompletionActionsCatC.CODE_78_PRESENT:
      return {
        ...state,
        code78Present: true,
      };
    case passCompletionActionsCatC.CODE_78_NOT_PRESENT:
      return {
        ...state,
        code78Present: false,
      };
    case passCompletionActions.POPULATE_PASS_COMPLETION:
      return {
        passCertificateNumber: null,
        provisionalLicenceProvided: null,
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

export const getPassCompletion = createFeatureSelector<CatCUniqueTypes.PassCompletion>('passCompletion');
