import { Action } from '@ngrx/store';

export const ASSESSMENT_REPORT_CHANGED = '[Test Summary] [CatCPC] Assessment Report changed';

export class AssessmentReportChanged implements Action {
  readonly type = ASSESSMENT_REPORT_CHANGED;
  constructor(public assessmentReport: string) { }
}

export type Types =
  | AssessmentReportChanged;
