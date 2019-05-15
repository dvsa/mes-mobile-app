import { Action } from '@ngrx/store';

export const SET_TEST_STATUS_BOOKED = '[???] Set Test Status to Booked';
export const SET_TEST_STATUS_STARTED = '[???] Set Test Status to Started';
export const SET_TEST_STATUS_DECIDED = '[???] Set Test Status to Decided';
export const SET_TEST_STATUS_COMPLETED = '[???] Set Test Status to Completed';
export const SET_TEST_STATUS_SUBMITTED = '[???] Set Test Status to Submitted';

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
  | SetTestStatusCompleted
  | SetTestStatusSubmitted;
