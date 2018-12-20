import { Action } from '@ngrx/store';

export const LOAD_JOURNAL = '[Main] Load Journal';
export const LOAD_JOURNAL_SUCCESS = '[Main] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[Main] Load Journal Failure';

export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL;
}

export class LoadJournalSuccess implements Action {
  readonly type = LOAD_JOURNAL_SUCCESS;
  constructor(public payload) {}
}

export class LoadJournalFailure implements Action {
  readonly type = LOAD_JOURNAL_FAILURE;
  constructor(public payload) {}
}

export type Types = 
  | LoadJournal
  | LoadJournalSuccess
  | LoadJournalFailure;

