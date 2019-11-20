import { Action } from '@ngrx/store';

export const CODE_78_PRESENT = '[Pass Completion] Code 78 present';
export const CODE_78_NOT_PRESENT = '[Pass Completion] Code 78 not present';

export class Code78Present implements Action {
  readonly type = CODE_78_PRESENT;
}

export class Code78NotPresent implements Action {
  readonly type = CODE_78_NOT_PRESENT;
}

export type Types =
  | Code78Present
  | Code78NotPresent;
