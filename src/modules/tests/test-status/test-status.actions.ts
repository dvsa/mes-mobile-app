import { Action } from '@ngrx/store';
import { TestStatus } from './test-status.model';

export const SET_TEST_STATUS_BOOKED = '[JournalEffects] Set Test Status to Booked';
export const SET_TEST_STATUS_STARTED = '[WaitingRoomEffects] Set Test Status to Started';
export const SET_TEST_STATUS_DECIDED = '[DebriefEffects] Set Test Status to Decided';
export const SET_TEST_STATUS_WRITE_UP = '[PostTestDeclarationsEffects] Set Test Status to WriteUp';
export const SET_TEST_STATUS_AUTOSAVED = '[AutoSaveEffects] Set Test Status to Autosaved';
export const SET_TEST_STATUS_COMPLETED = '[OfficeEffects] Set Test Status to Completed';
export const SET_TEST_STATUS_SUBMITTED = '[TestsEffects] Set Test Status to Submitted';
export const SET_TEST_STATUS_DYNAMIC = '[TestsEffects] Set Test Status dynamically';

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

export class SetTestStatusAutosaved implements Action {
  readonly type = SET_TEST_STATUS_AUTOSAVED;
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

export class SetTestStatusDynamic implements Action {
  readonly type = SET_TEST_STATUS_DYNAMIC;
  constructor(public slotId: string, public testStatus: TestStatus) {}
}

export type Types =
  | SetTestStatusBooked
  | SetTestStatusStarted
  | SetTestStatusDecided
  | SetTestStatusWriteUp
  | SetTestStatusAutosaved
  | SetTestStatusCompleted
  | SetTestStatusDynamic
  | SetTestStatusSubmitted;
