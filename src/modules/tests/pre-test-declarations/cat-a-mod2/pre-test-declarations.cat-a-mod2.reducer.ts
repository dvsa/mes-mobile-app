import { PreTestDeclarations } from '@dvsa/mes-test-schema/categories/AM2';
import * as preTestDeclarationActions from '../common/pre-test-declarations.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: PreTestDeclarations = {
  insuranceDeclarationAccepted: false,
  residencyDeclarationAccepted: false,
  preTestSignature: '',
  mod1CertificateNumber: '',
};

export function preTestDeclarationsCatAMod2Reducer(
  state = initialState,
  action: preTestDeclarationActions.Types,
): PreTestDeclarations {
  switch (action.type) {
    case preTestDeclarationActions.CLEAR_DECLARATIONS:
      return initialState;
    case preTestDeclarationActions.TOGGLE_INSURANCE_DECLARATION:
      return {
        ...state,
        insuranceDeclarationAccepted: !state.insuranceDeclarationAccepted,
      };
    case preTestDeclarationActions.TOGGLE_RESIDENCY_DECLARATION:
      return {
        ...state,
        residencyDeclarationAccepted: !state.residencyDeclarationAccepted,
      };
    case preTestDeclarationActions.SIGNATURE_DATA_CHANGED:
      return {
        ...state,
        preTestSignature: action.payload,
      };
    case preTestDeclarationActions.SIGNATURE_DATA_CLEARED:
      return {
        ...state,
        preTestSignature: '',
      };

    default:
      return state;
  }
}

export const getPreTestDeclarations = createFeatureSelector<PreTestDeclarations>('preTestDeclarations');
