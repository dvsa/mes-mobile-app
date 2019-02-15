import { Action } from '@ngrx/store';

export const HEALTH_DECLARATION_VIEW_DID_ENTER = '[HealthDeclarationPage] Health declration did enter';

export class HealthDeclarationViewDidEnter implements Action {
  readonly type = HEALTH_DECLARATION_VIEW_DID_ENTER;
}

export type Types =
  | HealthDeclarationViewDidEnter;
