import { PreTestDeclarations } from '@dvsa/mes-test-schema/categories/B';
import * as preTestDeclarationActions from './pre-test-declarations.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: PreTestDeclarations = {
  insuranceDeclarationAccepted: false,
  residencyDeclarationAccepted: false,
  signature: '',
};

export function preTestDeclarationsReducer(
  state = initialState,
  action: preTestDeclarationActions.Types,
): PreTestDeclarations {
  switch (action.type) {
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
        signature: action.payload,
      };
    case preTestDeclarationActions.SIGNATURE_DATA_CLEARED:
      return {
        ...state,
        signature: '',
      };

    default:
      return state;
  }
}

export const getPreTestDeclarations = createFeatureSelector<PreTestDeclarations>('preTestDeclarations');
