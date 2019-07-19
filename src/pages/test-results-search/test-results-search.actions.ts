import { Action } from '@ngrx/store';

export const TEST_RESULT_SEARCH_VIEW_DID_ENTER = '[TestResultSearch] Test Result Search Did Enter';
export const PERFORM_APPLICATION_REFERENCE_SEARCH = '[TestResultSearch] Performed an application reference search';
export const PERFORM_DRIVER_NUMBER_SEARCH = '[TestResultSearch] Performed an driver number search';
export const PERFORM_LDTM_SEARCH = '[TestResultSearch] Performed an LDTM search';

export class TestResultSearchViewDidEnter implements Action {
  readonly type = TEST_RESULT_SEARCH_VIEW_DID_ENTER;
}

export class PerformApplicationReferenceSearch implements Action {
  readonly type = PERFORM_APPLICATION_REFERENCE_SEARCH;
}

export class PerformDriverNumberSearch implements Action {
  readonly type = PERFORM_DRIVER_NUMBER_SEARCH;
}

export class PerformLDTMSearch implements Action {
  readonly type = PERFORM_LDTM_SEARCH;
}

export type Types =
  | TestResultSearchViewDidEnter
  | PerformApplicationReferenceSearch
  | PerformDriverNumberSearch
  | PerformLDTMSearch;
