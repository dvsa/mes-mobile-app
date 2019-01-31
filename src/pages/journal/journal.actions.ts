import { Action } from '@ngrx/store';
import { MesError } from '../../common/mes-error.model';
import { SlotItem } from '../../providers/slot-selector/slot-item';

export const LOAD_JOURNAL = '[JournalPage] Load Journal';
export const FETCH_JOURNAL = '[JournalPage] Fetch Journal';
export const SETUP_POLLING = '[JournalPage] Setup Polling';
export const STOP_POLLING = '[JournalPage] Stop Polling';
export const LOAD_JOURNAL_POLLED = '[JournalPage] Load Journal Polled';
export const CANCEL_JOURNAL_POLL = '[JournalPage] Cancel Journal Poll';
export const LOAD_JOURNAL_SUCCESS = '[JournalEffects] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[JournalEffects] Load Journal Failure';
export const UNLOAD_JOURNAL = '[JournalPage] Unload Journal';
export const CLEAR_CHANGED_SLOT = '[JournalPage] Clear Changed Slot';
export const UNSET_ERROR = '[JournalPage] Unset Error';
export const SELECT_PREVIOUS_DAY = '[JournalPage] Select Previous Day';
export const SELECT_NEXT_DAY = '[JournalPage] Select Next Day';
export const SET_SELECTED_DAY = '[JournalEffects] Set Selected Day';

export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL;
}

export class FetchJournal implements Action {
  readonly type = FETCH_JOURNAL;
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

export class LoadJournalPolled implements Action {
  readonly type = LOAD_JOURNAL_POLLED;
}

export class CancelJournalPoll implements Action {
  readonly type = CANCEL_JOURNAL_POLL;
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

export class SelectPreviousDay implements Action {
  readonly type = SELECT_PREVIOUS_DAY;
}

export class SelectNextDay implements Action {
  readonly type = SELECT_NEXT_DAY;
}

export class SetSelectedDate implements Action {
  readonly type = SET_SELECTED_DAY;
  constructor(public payload: string) {}
}

export class SetupPolling implements Action {
  readonly type = SETUP_POLLING;
}

export class StopPolling implements Action {
  readonly type = STOP_POLLING;
}

export type Types = 
  | LoadJournal
  | FetchJournal
  | LoadJournalPolled
  | CancelJournalPoll
  | LoadJournalSuccess
  | LoadJournalFailure
  | UnloadJournal
  | UnsetError
  | ClearChangedSlot
  | SelectPreviousDay
  | SelectNextDay
  | SetSelectedDate
  | SetupPolling
  | StopPolling;
