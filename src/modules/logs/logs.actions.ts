import { Action } from '@ngrx/store';
import { Log } from '../../shared/models/log.model';

export const SAVE_LOG = '[GLOBAL] Save Log';
export const START_SENDING_LOGS = '[AppComponent] Start Sending Logs';
export const SEND_LOGS = '[LogsEffects] Send Logs';
export const SEND_LOGS_SUCCESS = '[LogsEffects] Send Logs Success';
export const SEND_LOGS_FAILURE = '[LogsEffects] Send Logs Failure';

export class SaveLog implements Action {
  readonly type = SAVE_LOG;
  constructor(public payload: Log) {}
}

export class StartSendingLogs implements Action {
  readonly type = START_SENDING_LOGS;
}

export class SendLogs implements Action {
  readonly type = SEND_LOGS;
}

export class SendLogsSuccess implements Action {
  readonly type = SEND_LOGS_SUCCESS;
  constructor(public timestamps: number[]) {}
}

export class SendLogsFailure implements Action {
  readonly type = SEND_LOGS_FAILURE;
  constructor(public error: any) {}
}

export type Types =
  SaveLog |
  StartSendingLogs |
  SendLogs |
  SendLogsSuccess |
  SendLogsFailure;
