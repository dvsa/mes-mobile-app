import { Action } from "@ngrx/store";

export const LOAD_JOURNAL = '[Main] Load Journal';
export const LOAD_JOURNAL_WITH_DELAY = '[Main] Load Journal With Delay';
export const LOAD_JOURNAL_WITH_CHANCE_TO_FAIL = '[Main] Load Journal With Chance To Fail';
export const LOAD_JOURNAL_SUCCESS = '[Main] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[Main] Load Journal Failure';

export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL
}

export class LoadJournalWithDelay implements Action {
  readonly type = LOAD_JOURNAL_WITH_DELAY
}

export class LoadJournalWithChanceToFail implements Action {
  readonly type = LOAD_JOURNAL_WITH_CHANCE_TO_FAIL
}

export class LoadJournalSuccess implements Action {
  readonly type = LOAD_JOURNAL_SUCCESS
  constructor(public payload) {}
}

export class LoadJournalFailure implements Action {
  readonly type = LOAD_JOURNAL_FAILURE
  constructor(public payload) {}
}

export const CLEAR_TEST_SLOTS = '[Journal] Clear test slots';
export const CLEAR_ERROR = '[Journal] Clear error';

export class ClearTestSlots implements Action {
  readonly type = CLEAR_TEST_SLOTS
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR
}

export type Types = 
  | LoadJournal
  | LoadJournalWithDelay
  | LoadJournalWithChanceToFail
  | LoadJournalSuccess
  | LoadJournalFailure
  | ClearTestSlots
  | ClearError;