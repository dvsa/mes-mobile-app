import { Action } from '@ngrx/store';

export const TOGGLE_INSURANCE_DECLARATION = '[PreTestDeclarations] Insurance declaration toggled';
export const TOGGLE_RESIDENCY_DECLARATION = '[PreTestDeclarations] Residency declaration toggled';

export class ToggleInsuranceDeclaration implements Action {
  readonly type = TOGGLE_INSURANCE_DECLARATION;
}

export class ToggleResidencyDeclaration implements Action {
  readonly type = TOGGLE_RESIDENCY_DECLARATION;
}

export type Types =
  | ToggleInsuranceDeclaration
  | ToggleResidencyDeclaration;
