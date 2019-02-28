import { Action } from '@ngrx/store';
import { Log } from '../../shared/models/log.model';

export const SAVE_LOG = '[Anywhere] Save Log';
export const START_SENDING_LOGS = '[AppComponent] Start Sending Logs';

export class SaveLog implements Action {
  readonly type = SAVE_LOG;
  constructor(public payload: Log) {}
}

export class StartSendingLogs implements Action {
  readonly type = START_SENDING_LOGS;
}

export type Types =
  SaveLog |
  StartSendingLogs;
