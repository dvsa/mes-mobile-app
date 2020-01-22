
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { Action } from '@ngrx/store';

export const SET_ACTIVITY_CODE = '[Tests] Set activity code';

export class SetActivityCode implements Action {
  readonly type = SET_ACTIVITY_CODE;
  constructor(public payload: ActivityCode) {}
}

export type Types =
  | SetActivityCode;
