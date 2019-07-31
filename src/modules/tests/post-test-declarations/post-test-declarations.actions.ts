import { Action } from '@ngrx/store';

export const CLEAR_DECLARATIONS = '[HealthDeclarations] Clear declarations';
export const TOGGLE_HEALTH_DECLARATION = '[HealthDeclarations] Health declaration toggled';
export const TOGGLE_RECEIPT_DECLARATION = '[HealthDeclarations] Receipt declaration toggled';
export const SIGNATURE_DATA_CHANGED = '[HealthDeclarations] Signature data changed';
export const SIGNATURE_DATA_CLEARED = '[HealthDeclarations] Signature data cleared';

export class ClearPostTestDeclarations implements Action {
  readonly type = CLEAR_DECLARATIONS;
}

export class ToggleHealthDeclaration implements Action {
  readonly type = TOGGLE_HEALTH_DECLARATION;
}

export class ToggleReceiptDeclaration implements Action {
  readonly type = TOGGLE_RECEIPT_DECLARATION;
}

export class SignatureDataChanged implements Action {
  constructor(public payload: string) { }
  readonly type = SIGNATURE_DATA_CHANGED;
}
export class SignatureDataCleared implements Action {
  readonly type = SIGNATURE_DATA_CLEARED;
}

export type Types =
  | ClearPostTestDeclarations
  | ToggleHealthDeclaration
  | ToggleReceiptDeclaration
  | SignatureDataChanged
  | SignatureDataCleared;
