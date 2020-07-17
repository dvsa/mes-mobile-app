import { Action } from '@ngrx/store';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { HttpErrorResponse } from '@angular/common/http';
import { DelegatedRekeySearchError } from './delegated-rekey-search-error-model';

export const DELEGATED_REKEY_SEARCH_VIEW_DID_ENTER = '[DelegatedRekeySearch] Delegated Rekey Search Did Enter';
export const DELEGATED_REKEY_SEARCH_CLEAR_STATE = '[DelegatedRekeySearch] Delegated Rekey Search Clear State';

export const SEARCH_BOOKED_DELEGATED_TEST = '[DelegatedRekeySearch] Search Booked Test';
export const SEARCH_BOOKED_DELEGATED_TEST_SUCCESS = '[DelegatedRekeySearchEffects] Search Booked Test Success';
export const SEARCH_BOOKED_DELEGATED_TEST_FAILURE = '[DelegatedRekeySearchEffects] Search Booked Test Failure';

export class DelegatedRekeySearchViewDidEnter implements Action {
  readonly type = DELEGATED_REKEY_SEARCH_VIEW_DID_ENTER;
}

export class SearchBookedDelegatedTest implements Action {
  readonly type = SEARCH_BOOKED_DELEGATED_TEST;
  constructor(public appRef: string) {}
}

export class SearchBookedDelegatedTestSuccess implements Action {
  readonly type = SEARCH_BOOKED_DELEGATED_TEST_SUCCESS;
  constructor(public testSlot: TestSlot) {}
}

export class SearchBookedDelegatedTestFailure implements Action {
  readonly type = SEARCH_BOOKED_DELEGATED_TEST_FAILURE;
  constructor(public err: HttpErrorResponse | DelegatedRekeySearchError) {}
}

export class DelegatedRekeySearchClearState implements Action {
  readonly type = DELEGATED_REKEY_SEARCH_CLEAR_STATE;
}

export type DelegatedRekeySearchActionTypes =
  | DelegatedRekeySearchViewDidEnter
  | DelegatedRekeySearchClearState
  | SearchBookedDelegatedTest
  | SearchBookedDelegatedTestSuccess
  | SearchBookedDelegatedTestFailure;
