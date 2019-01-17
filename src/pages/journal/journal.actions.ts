import { Action } from '@ngrx/store';
import { MesError } from '../../common/mes-error.model';

export const LOAD_JOURNAL = '[JournalPage] Load Journal';
export const LOAD_JOURNAL_POLLED = '[JournalPage] Load Journal Polled';
export const LOAD_JOURNAL_SUCCESS = '[JournalPage] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[JournalPage] Load Journal Failure';

export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL;
}

export class LoadJournalSuccess implements Action {
  readonly type = LOAD_JOURNAL_SUCCESS;

  // TODO: declare payload with the correct type when we have a slot type in place
  constructor(public payload: any[]) {}
}

export class LoadJournalFailure implements Action {
  readonly type = LOAD_JOURNAL_FAILURE;
  constructor(public payload: MesError) {}
}

export class LoadJournalPolled implements Action {
  readonly type = LOAD_JOURNAL_POLLED;
  constructor(public payload: {cancelPoll: boolean}) {}
}

export type Types = 
  | LoadJournal
  | LoadJournalPolled
  | LoadJournalSuccess
  | LoadJournalFailure;

