import { Action } from '@ngrx/store';

export const SET_REKEY_DATE = '[Rekey Date Actions] Set the date the test was rekeyed';

export class SetRekeyDate implements Action {
  readonly type = SET_REKEY_DATE;
}

export type Types = SetRekeyDate;
