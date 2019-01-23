import { Action } from '@ngrx/store';
import { MesError } from '../../common/mes-error.model';
import { SlotItem } from '../../providers/slot-selector/slot-item';

export const LOAD_JOURNAL = '[JournalPage] Load Journal';
export const LOAD_JOURNAL_SUCCESS = '[JournalPage] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[JournalPage] Load Journal Failure';
export const UNLOAD_JOURNAL = '[JournalPage] Unload Journal'
export const UNSET_ERROR = '[JournalPage] Unset error';
export const CLEAR_CHANGED_SLOT = '[JournalPage] Clear Changed Slot';
export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL;
}

export class LoadJournalSuccess implements Action {
  readonly type = LOAD_JOURNAL_SUCCESS;

  // TODO: declare payload with the correct type when we have a slot type in place
  constructor(public payload: {[k: string]: SlotItem[]}) {}
}

export class LoadJournalFailure implements Action {
  readonly type = LOAD_JOURNAL_FAILURE;
  constructor(public payload: MesError) {}
}

export class UnloadJournal implements Action {
  readonly type = UNLOAD_JOURNAL;
}

export class UnsetError implements Action {
  readonly type = UNSET_ERROR;
}

export class ClearChangedSlot implements Action {
  readonly type = CLEAR_CHANGED_SLOT;
  constructor(public slotId: number) {}
}

export type Types = 
  | LoadJournal
  | LoadJournalSuccess
  | LoadJournalFailure
  | UnloadJournal
  | UnsetError
  | ClearChangedSlot;

