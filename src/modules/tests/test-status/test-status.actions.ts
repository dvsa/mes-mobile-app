import { Action } from '@ngrx/store';

export const SET_TEST_STATUS_BOOKED = '[JournalEffects] Set Test Status to Booked';
export const SET_TEST_STATUS_STARTED = '[WaitingRoomEffects] Set Test Status to Started';
export const SET_TEST_STATUS_DECIDED = '[DebriefEffects] Set Test Status to Decided';
export const SET_TEST_STATUS_WRITE_UP = '[PostTestDeclarationsEffects] Set Test Status to WriteUp';
export const SET_TEST_STATUS_COMPLETED = '[OfficeEffects] Set Test Status to Completed';
export const SET_TEST_STATUS_SUBMITTED = '[TestsEffects] Set Test Status to Submitted';

export class SetTestStatusBooked implements Action {
  readonly type = SET_TEST_STATUS_BOOKED;
  constructor(public slotId: string) {}
}

export class SetTestStatusStarted implements Action {
  readonly type = SET_TEST_STATUS_STARTED;
  constructor(public slotId: string) {}
}

export class SetTestStatusDecided implements Action {
  readonly type = SET_TEST_STATUS_DECIDED;
  constructor(public slotId: string) {}
}

export class SetTestStatusWriteUp implements Action {
  readonly type = SET_TEST_STATUS_WRITE_UP;
  constructor(public slotId: string) {}
}

export class SetTestStatusCompleted implements Action {
  readonly type = SET_TEST_STATUS_COMPLETED;
  constructor(public slotId: string) {}
}

export class SetTestStatusSubmitted implements Action {
  readonly type = SET_TEST_STATUS_SUBMITTED;
  constructor(public slotId: string) {}
}

export type Types =
  | SetTestStatusBooked
  | SetTestStatusStarted
  | SetTestStatusDecided
  | SetTestStatusWriteUp
  | SetTestStatusCompleted
  | SetTestStatusSubmitted;
