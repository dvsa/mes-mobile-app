import { Action } from '@ngrx/store';

export const SET_EXAMINER_KEYED = '[Test Actions] Set the examiner the test was keyed by';

export class SetExaminerKeyed implements Action {
  readonly type = SET_EXAMINER_KEYED;

  constructor(public examinerKeyed: number) {}
}

export type Types = SetExaminerKeyed;
