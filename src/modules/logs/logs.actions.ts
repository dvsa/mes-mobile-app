import { Action } from '@ngrx/store';
import { Log } from '../../shared/models/log.model';

export const SAVE_LOG = 'Save Log';

export class SaveLog implements Action {
  readonly type = SAVE_LOG;
  constructor(public payload: Log) {}
}

export type Types =
  SaveLog;
