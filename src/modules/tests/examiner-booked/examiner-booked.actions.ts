import { Action } from '@ngrx/store';

export const SET_EXAMINER_BOOKED = '[Test Actions] Set the examiner the test was booked against';

export class SetExaminerBooked implements Action {
  readonly type = SET_EXAMINER_BOOKED;

  constructor(public examinerBooked: number | string) {}
}

export type Types = SetExaminerBooked;
