import { Action } from '@ngrx/store';

export const COMMUNICATION_VIEW_DID_ENTER = '[CommunicationPage] Communication page did enter';
export const COMMUNICATION_VIEW_CHOSE_EMAIL_PROVIDED_AT_BOOKING =
'[CommunicationPage] Communication page chose email provided at booking';
export const COMMUNICATION_VIEW_CHOSE_NEW_EMAIL =
  '[CommunicationPage] Communication page chose new email';
export const COMMUNICATION_VIEW_ADDED_NEW_CANDIDATE_EMAIL = '[CommunicationPage] Added new candidate email';

export class CommunicationViewDidEnter implements Action {
  readonly type = COMMUNICATION_VIEW_DID_ENTER;
}

export class CommunicationViewChoseEmailProvidedAtBooking implements Action {
  readonly type = COMMUNICATION_VIEW_CHOSE_EMAIL_PROVIDED_AT_BOOKING;
}

export class CommunicationViewChoseNewEmail implements Action {
  readonly type = COMMUNICATION_VIEW_CHOSE_NEW_EMAIL;
}

export class CommunicationViewInputNewEmail implements Action {
  readonly type = COMMUNICATION_VIEW_ADDED_NEW_CANDIDATE_EMAIL;
  constructor(public payload: string) {}
}

export type Types =
  | CommunicationViewDidEnter
  | CommunicationViewChoseEmailProvidedAtBooking
  | CommunicationViewChoseNewEmail
  | CommunicationViewInputNewEmail;
