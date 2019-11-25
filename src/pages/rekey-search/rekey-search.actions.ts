import { Action } from '@ngrx/store';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { HttpErrorResponse } from '@angular/common/http';
import { RekeySearchError } from './rekey-search-error-model';

export const REKEY_SEARCH_VIEW_DID_ENTER = '[RekeySearch] Rekey Search Did Enter';
export const REKEY_SEARCH_CLEAR_STATE = '[RekeySearch] Rekey Search Clear State';

export const SEARCH_BOOKED_TEST = '[RekeySearch] Search Booked Test';
export const SEARCH_BOOKED_TEST_SUCCESS = '[RekeySearchEffects] Search Booked Test Success';
export const SEARCH_BOOKED_TEST_FAILURE = '[RekeySearchEffects] Search Booked Test Failure';

export class RekeySearchViewDidEnter implements Action {
  readonly type = REKEY_SEARCH_VIEW_DID_ENTER;
}

export class SearchBookedTest implements Action {
  readonly type = SEARCH_BOOKED_TEST;
  constructor(public appRef: string, public staffNumber: string) {}
}

export class SearchBookedTestSuccess implements Action {
  readonly type = SEARCH_BOOKED_TEST_SUCCESS;
  constructor(public testSlot: TestSlot, public staffNumber: string) {}
}

export class SearchBookedTestFailure implements Action {
  readonly type = SEARCH_BOOKED_TEST_FAILURE;
  constructor(public err: HttpErrorResponse | RekeySearchError) {}
}

export class RekeySearchClearState implements Action {
  readonly type = REKEY_SEARCH_CLEAR_STATE;
}

export type RekeySearchActionTypes =
  | RekeySearchViewDidEnter
  | RekeySearchClearState
  | SearchBookedTest
  | SearchBookedTestSuccess
  | SearchBookedTestFailure;
