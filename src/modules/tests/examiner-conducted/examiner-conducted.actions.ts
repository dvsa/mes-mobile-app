import { Action } from '@ngrx/store';

export const SET_EXAMINER_CONDUCTED = '[Test Actions] Set the examiner the test was conducted by';

export class SetExaminerConducted implements Action {
  readonly type = SET_EXAMINER_CONDUCTED;

  constructor(public examinerConducted: number | string) {}
}

export type Types = SetExaminerConducted;
