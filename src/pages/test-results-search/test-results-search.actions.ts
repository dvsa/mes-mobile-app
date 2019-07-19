import { Action } from '@ngrx/store';

export const TEST_RESULT_SEARCH_VIEW_DID_ENTER = '[TestResultSearch] Test Result Search Did Enter';
export const PERFORM_STANDARD_SEARCH = '[TestResultSearch] Perform a standard search';
export const PERFORM_ADVANCED_SEARCH = '[TestResultSearch] Perform a advanced search';

export class TestResultSearchViewDidEnter implements Action {
  readonly type = TEST_RESULT_SEARCH_VIEW_DID_ENTER;
}

export class PerformStandardSearch implements Action {
  readonly type = PERFORM_STANDARD_SEARCH;
}

export class PerformAdvancedSearch implements Action {
  readonly type = PERFORM_ADVANCED_SEARCH;
}

export type Types =
  | TestResultSearchViewDidEnter
  | PerformStandardSearch
  | PerformAdvancedSearch;
