import { Action } from '@ngrx/store';

export const HEALTH_DECLARATION_VIEW_DID_ENTER = '[HealthDeclarationPage] Health declaration did enter';
export const CONTINUE_FROM_DECLARATION = '[HealthDeclarationPage] Continue from declaration';

export class HealthDeclarationViewDidEnter implements Action {
  readonly type = HEALTH_DECLARATION_VIEW_DID_ENTER;
}

export class ContinueFromDeclaration implements Action {
  readonly type = CONTINUE_FROM_DECLARATION;
}

export type Types =
  | HealthDeclarationViewDidEnter
  | ContinueFromDeclaration;
