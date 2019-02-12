import { Action } from '@ngrx/store';

export const TEST_REPORT_VIEW_DID_ENTER = '[TestReportPage] Test Report did enter';


export class TestReportViewDidEnter implements Action {
  readonly type = TEST_REPORT_VIEW_DID_ENTER;
}

export type Types = 
  | TestReportViewDidEnter;
