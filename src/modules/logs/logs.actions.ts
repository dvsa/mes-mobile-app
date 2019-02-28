import { Action } from '@ngrx/store';

export const SAVE_LOG = 'Save Log';

export class SaveLog implements Action {
  readonly type = SAVE_LOG;

  // TODO: specify the type
  constructor(public payload: any) {}
}

export type Types =
  SaveLog;
