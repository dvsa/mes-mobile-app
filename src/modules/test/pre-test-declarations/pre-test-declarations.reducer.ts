import { PreTestDeclarations } from '@dvsa/mes-test-schema/CatBTest';
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
    default:
      return state;
  }
}

export const getPreTestDeclarationsState = createFeatureSelector<PreTestDeclarations>('preTestDeclarations');
