import { Action } from '@ngrx/store';

export const EYESIGHT_RESULT_PASSED = '[Eyesight result] Passed';
export const EYESIGHT_RESULT_FAILED = '[Eyesight result] Failed';
export const EYESIGHT_RESULT_RESET = '[Eyesight result] Reset';

export class EyesightResultPasssed implements Action {
  readonly type = EYESIGHT_RESULT_PASSED;
}

export class EyesightResultFailed implements Action {
  readonly type = EYESIGHT_RESULT_FAILED;
}

export class EyesightResultReset implements Action {
  readonly type = EYESIGHT_RESULT_RESET;
}

export enum EyesightTestResult {
  Pass = 'P',
  Fail = 'F',
}
export type Types =
  | EyesightResultPasssed
  | EyesightResultFailed
  | EyesightResultReset;
