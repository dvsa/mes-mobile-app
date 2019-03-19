import { Action } from '@ngrx/store';

export const CLEAR_PRE_TEST_DECLARATIONS = '[PreTestDeclarations] Clear';
export const TOGGLE_INSURANCE_DECLARATION = '[PreTestDeclarations] Insurance declaration toggled';
export const TOGGLE_RESIDENCY_DECLARATION = '[PreTestDeclarations] Residency declaration toggled';

export class ClearPreTestDeclarations implements Action {
  readonly type = CLEAR_PRE_TEST_DECLARATIONS;
}

export class ToggleInsuranceDeclaration implements Action {
  readonly type = TOGGLE_INSURANCE_DECLARATION;
}

export class ToggleResidencyDeclaration implements Action {
  readonly type = TOGGLE_RESIDENCY_DECLARATION;
}

export type Types =
  | ClearPreTestDeclarations
  | ToggleInsuranceDeclaration
  | ToggleResidencyDeclaration;
