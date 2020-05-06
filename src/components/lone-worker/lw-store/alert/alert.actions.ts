import { Action } from '@ngrx/store';
import { Incident } from '@dvsa/lw-incident-model';
import { AlertSendReciept } from './alert.model';
import { HttpErrorResponse } from '@angular/common/http';

export const SEND_AMBER_ALERT = '[Lone Worker Alert] Send Amber Alert';
export const AMBER_ALERT_SENT = '[Lone Worker Alert] Amber Alert Sent';
export const SEND_RED_ALERT = '[Lone Worker Alert] Send Red Alert';
export const RED_ALERT_SENT = '[Lone Worker Alert] Red Alert Sent';
export const RED_ALERT_SEND_FAILURE = '[Lone Worker Alert] Red Alert Send Failure';
export const AMBER_ALERT_SEND_FAILURE = '[Lone Worker Alert] Amber Alert Send Failure';

export class SendAmberAlert implements Action {
  readonly type = SEND_AMBER_ALERT;
  constructor(public incident: Incident) { }
}

export class SendRedAlert implements Action {
  readonly type = SEND_RED_ALERT;
  constructor(public incident: Incident) { }
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

export type AlertActionTypes =
  SendAmberAlert |
  SendRedAlert |
  RedAlertSent |
  AmberAlertSent |
  RedAlertSendFailure |
  AmberAlertSendFailure;
