import { Action } from '@ngrx/store';
import { IncidentCore } from '@dvsa/lw-incident-model';
import { AlertSendReciept } from './raised-alert.model';
import { HttpErrorResponse } from '@angular/common/http';

export const SEND_AMBER_ALERT = '[Lone Worker Raised Alert] Send Amber Alert';
export const AMBER_ALERT_SENT = '[Lone Worker Raised Alert] Amber Alert Sent';
export const SEND_RED_ALERT = '[Lone Worker Raised Alert] Send Red Alert';
export const RED_ALERT_SENT = '[Lone Worker Raised Alert] Red Alert Sent';
export const RED_ALERT_SEND_FAILURE = '[Lone Worker Raised Alert] Red Alert Send Failure';
export const AMBER_ALERT_SEND_FAILURE = '[Lone Worker Raised Alert] Amber Alert Send Failure';
export const RESET_ALERT_STATE = '[Lone Worker Raised Alert] Reset State';

export class SendAmberAlert implements Action {
  readonly type = SEND_AMBER_ALERT;
  constructor(public incident: IncidentCore) { }
}

export class SendRedAlert implements Action {
  readonly type = SEND_RED_ALERT;
  constructor(public incident: IncidentCore) { }
}

export class AmberAlertSent implements Action {
  readonly type = AMBER_ALERT_SENT;
  constructor(public sentReceipt: AlertSendReciept) { }
}

export class RedAlertSent implements Action {
  readonly type = RED_ALERT_SENT;
  constructor(public sentReceipt: AlertSendReciept) { }
}

export class RedAlertSendFailure implements Action {
  readonly type = RED_ALERT_SEND_FAILURE;
  constructor(public error: HttpErrorResponse) {}
}

export class AmberAlertSendFailure implements Action {
  readonly type = AMBER_ALERT_SEND_FAILURE;
  constructor(public error: HttpErrorResponse) {}
}

export class ResetRaisedAlertState implements Action {
  readonly type = RESET_ALERT_STATE;
}

export type RaisedAlertActionTypes =
  SendAmberAlert |
  SendRedAlert |
  RedAlertSent |
  AmberAlertSent |
  RedAlertSendFailure |
  AmberAlertSendFailure |
  ResetRaisedAlertState;
