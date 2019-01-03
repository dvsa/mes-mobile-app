import { Action } from '@ngrx/store';
import { ExaminerWorkSchedule } from '../../common/domain/Journal';
import { MesError } from '../../common/mes-error.model';

export const LOAD_JOURNAL = '[JournalPage] Load Journal';
export const LOAD_JOURNAL_SUCCESS = '[JournalPage] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[JournalPage] Load Journal Failure';

export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL;
}

export class LoadJournalSuccess implements Action {
  readonly type = LOAD_JOURNAL_SUCCESS;
  constructor(public payload: ExaminerWorkSchedule) {}
}

export class LoadJournalFailure implements Action {
  readonly type = LOAD_JOURNAL_FAILURE;
  constructor(public payload: MesError) {}
}

export type Types = 
  | LoadJournal
  | LoadJournalSuccess
  | LoadJournalFailure;

