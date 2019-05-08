import { Action } from '@ngrx/store';

export const COMMUNICATION_VIEW_DID_ENTER = '[CommunicationPage] Communication page did enter';

export class CommunicationViewDidEnter implements Action {
  readonly type = COMMUNICATION_VIEW_DID_ENTER;
}

export type Types =
  | CommunicationViewDidEnter;
