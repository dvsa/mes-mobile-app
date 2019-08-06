import { Action } from '@ngrx/store';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { HttpErrorResponse } from '@angular/common/http';

export const REKEY_SEARCH_VIEW_DID_ENTER = '[RekeySearch] Rekey Search Did Enter';

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
  constructor(public payload: TestSlot) {}
}

export class SearchBookedTestFailure implements Action {
  readonly type = SEARCH_BOOKED_TEST_FAILURE;
  constructor(public err: HttpErrorResponse) {}
}

export type Types =
  | RekeySearchViewDidEnter
  | SearchBookedTest
  | SearchBookedTestSuccess
  | SearchBookedTestFailure;
