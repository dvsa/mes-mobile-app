import { Action } from '@ngrx/store';
import { MesError } from '../../shared/models/mes-error.model';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { ConnectionStatus } from '../../providers/network-state/network-state';

export const LOAD_JOURNAL = '[JournalPage] Load Journal';
export const LOAD_JOURNAL_SUCCESS = '[JournalEffects] Load Journal Success';
export const LOAD_JOURNAL_FAILURE = '[JournalEffects] Load Journal Failure';

export const LOAD_JOURNAL_SILENT = '[JournalEffect] Load Journal Silent';
export const LOAD_JOURNAL_SILENT_FAILURE = '[JournalEffect] Load Journal Silent Failure';

export const SETUP_JOURNAL_POLLING = '[JournalPage] Setup Journal Polling';
export const STOP_JOURNAL_POLLING = '[JournalPage] Stop Journal Polling';
export const UNLOAD_JOURNAL = '[JournalPage] Unload Journal';
export const CLEAR_CHANGED_SLOT = '[JournalPage] Clear Changed Slot';
export const UNSET_ERROR = '[JournalPage] Unset Error';
export const SELECT_PREVIOUS_DAY = '[JournalPage] Select Previous Day';
export const SELECT_NEXT_DAY = '[JournalPage] Select Next Day';
export const SET_SELECTED_DAY = '[JournalEffects] Set Selected Day';

export const START_TEST = '[TestOutcomeComponent] Start Test';
// Differs from START_TEST in that it won't trigger the journal -> test state copy effect
export const ACTIVATE_TEST = '[TestOutcomeComponent] Activate Test';

// Analytic actions

export const JOURNAL_VIEW_DID_ENTER = '[JournalPage] Journal view did enter';
export const JOURNAL_NAVIGATE_DAY = '[JournalPage] Navigate Day';
export const JOURNAL_REFRESH = '[JournalPage] Journal Refresh';
export const JOURNAL_REFRESH_ERROR = '[JournalPage] Journal Refresh Error';

export class LoadJournal implements Action {
  readonly type = LOAD_JOURNAL;
}

export class LoadJournalSilent implements Action {
  readonly type = LOAD_JOURNAL_SILENT;
}

export class LoadJournalSuccess implements Action {
  readonly type = LOAD_JOURNAL_SUCCESS;

  // TODO: declare payload with the correct type when we have a slot type in place
  constructor(
    public payload: { [k: string]: SlotItem[] },
    public onlineOffline: ConnectionStatus,
    public unAuthenticatedMode: boolean,
    public lastRefreshed: Date) { }
}

export class LoadJournalFailure implements Action {
  readonly type = LOAD_JOURNAL_FAILURE;
  constructor(public payload: MesError) { }
}

export class LoadJournalSilentFailure implements Action {
  readonly type = LOAD_JOURNAL_SILENT_FAILURE;
  constructor(public payload: MesError) { }
}

export class UnloadJournal implements Action {
  readonly type = UNLOAD_JOURNAL;
}

export class UnsetError implements Action {
  readonly type = UNSET_ERROR;
}

export class ClearChangedSlot implements Action {
  readonly type = CLEAR_CHANGED_SLOT;
  constructor(public slotId: number) { }
}

export class SelectPreviousDay implements Action {
  readonly type = SELECT_PREVIOUS_DAY;
}

export class SelectNextDay implements Action {
  readonly type = SELECT_NEXT_DAY;
}

export class SetSelectedDate implements Action {
  readonly type = SET_SELECTED_DAY;
  constructor(public payload: string) { }
}

export class SetupPolling implements Action {
  readonly type = SETUP_JOURNAL_POLLING;
}

export class StopPolling implements Action {
  readonly type = STOP_JOURNAL_POLLING;
}

export class JournalViewDidEnter implements Action {
  readonly type = JOURNAL_VIEW_DID_ENTER;
}

export class JournalNavigateDay implements Action {
  readonly type = JOURNAL_NAVIGATE_DAY;
  constructor(public day: string) { }
}

export class JournalRefreshError implements Action {
  readonly type = JOURNAL_REFRESH_ERROR;
  constructor(public errorDescription: string, public errorMessage: string) { }
}

export class JournalRefresh implements Action {
  readonly type = JOURNAL_REFRESH;
  constructor(public mode: string) { }
}

export class StartTest implements Action {
  readonly type = START_TEST;
  constructor(public slotId: number) { }
}

export class ActivateTest implements Action {
  readonly type = ACTIVATE_TEST;
  constructor(public slotId: number) { }
}

export type JournalActionTypes =
  | LoadJournal
  | LoadJournalSilent
  | LoadJournalSuccess
  | LoadJournalFailure
  | UnloadJournal
  | UnsetError
  | ClearChangedSlot
  | SelectPreviousDay
  | SelectNextDay
  | SetSelectedDate
  | SetupPolling
  | StopPolling
  | JournalViewDidEnter
  | JournalNavigateDay
  | JournalRefreshError
  | JournalRefresh
  | StartTest
  | ActivateTest;
