import * as passCompletionActions from '../common/pass-completion.actions';
import * as passCompletetionCatCCations from './pass-completion.cat-c.actions';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C/index';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatCUniqueTypes.PassCompletion = {
  passCertificateNumber: null,
  provisionalLicenceProvided: null,
  code78Present: null,
};

export const passCompletionCatCReducer = (
  state = initialState,
  action: passCompletionActions.Types | passCompletetionCatCCations.Types,
): CatCUniqueTypes.PassCompletion => {
  switch (action.type) {
    case passCompletetionCatCCations.CODE_78_PRESENT:
      return {
        ...state,
        code78Present: true,
      };
    case passCompletetionCatCCations.CODE_78_NOT_PRESENT:
      return {
        ...state,
        code78Present: false,
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
