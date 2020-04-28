import { Action } from '@ngrx/store';
import { Incident } from '@dvsa/lw-incident-model';
import { AlertSendReciept } from './alert.model';
import { HttpErrorResponse } from '@angular/common/http';

export const SEND_AMBER_ALERT = '[Lone Worker Alert] Send Amber Alert';
export const AMBER_ALERT_SENT = '[Lone Worker Alert] Amber Alert Sent';
export const SEND_RED_ALERT = '[Lone Worker Alert] Send Red Alert';
export const RED_ALERT_SENT = '[Lone Worker Alert] Red Alert Sent';
export const ALERT_SEND_FAILURE = '[Lone Worker Alert] Alert Send Failure';

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

export class AlertSendFailure implements Action {
  readonly type = ALERT_SEND_FAILURE;
  constructor(public error: HttpErrorResponse) {}
}

export type AlertActionTypes =
  SendAmberAlert |
  SendRedAlert |
  RedAlertSent |
  AmberAlertSent |
  AlertSendFailure;
