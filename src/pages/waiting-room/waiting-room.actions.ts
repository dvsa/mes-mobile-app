import { Action } from '@ngrx/store';

export const WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPage] Waiting room did enter';
export const TOGGLE_INSURANCE_DECLARATION = '[WaitingRoomPage] Insurance declaration toggled';
export const TOGGLE_RESIDENCY_DECLARATION = '[WaitingRoomPage] Residency declaration toggled';

export class WaitingRoomViewDidEnter implements Action {
  readonly type = WAITING_ROOM_VIEW_DID_ENTER;
}

export class ToggleInsuranceDeclaration implements Action {
  readonly type = TOGGLE_INSURANCE_DECLARATION;
}

export class ToggleResidencyDeclaration implements Action {
  readonly type = TOGGLE_RESIDENCY_DECLARATION;
}

export type Types =
  | WaitingRoomViewDidEnter
  | ToggleInsuranceDeclaration
  | ToggleResidencyDeclaration;
