import { Action } from '@ngrx/store';

export const TOGGLE_INSURANCE_DECLARATION = '[PreTestDeclarations] Insurance declaration toggled';
export const TOGGLE_RESIDENCY_DECLARATION = '[PreTestDeclarations] Residency declaration toggled';
export const SIGNATURE_DATA_CHANGED = '[PreTestDeclarations] Signature data changed';
export const SIGNATURE_DATA_CLEARED = '[PreTestDeclarations] Signature data cleared';

export class ToggleInsuranceDeclaration implements Action {
  readonly type = TOGGLE_INSURANCE_DECLARATION;
}

export class ToggleResidencyDeclaration implements Action {
  readonly type = TOGGLE_RESIDENCY_DECLARATION;
}

export class SignatureDataChanged implements Action {
  constructor(public payload: string) { }
  readonly type = SIGNATURE_DATA_CHANGED;
}
export class SignatureDataCleared implements Action {
  readonly type = SIGNATURE_DATA_CLEARED;
}

export type Types =
  | ToggleInsuranceDeclaration
  | ToggleResidencyDeclaration
  | SignatureDataChanged
  | SignatureDataCleared;
