import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ReceivedIncident } from './amber-alert.model';

export const SUBSCRIBE_TO_AMBER_ALERTS = '[Lone Worker Amber Alert] Subscribe to Amber Alerts';
export const UNSUBSCRIBE_FROM_AMBER_ALERTS = '[Lone Worker Amber Alert] Unsubscribe From Amber Alerts';
export const FETCH_AMBER_ALERTS = '[Lone Worker Amber Alert] Fetch Amber Alerts';
export const FETCH_AMBER_ALERTS_FAILURE = '[Lone Worker Amber Alert] Fetch Amber Alert Failure';
export const AMBER_ALERT_RESULT_RECIEVED = '[Lone Worker Amber Alert] Amber Alert Result Received';
export const VIEW_INCIDENT_REQUESTED = '[Lone Worker Amber Alert] View of Amber Incident Requested';
export const AMBER_INCIDENT_VIEWED = '[Lone Worker Amber Alert] Amber Invident Viewed';
export const AMBER_INCIDENT_VIEW_CLOSED = '[Lone Worker Amber Alert] Amber Incident View CLosed';
export const AMBER_INCIDENT_DISMISSED = '[Lone Worker Amber Alert] Amber Incident Dismissed';

export class SubscribeToAmberAlerts implements Action {
  readonly type = SUBSCRIBE_TO_AMBER_ALERTS;
  constructor(public testCentreId: string) { }
}

export class FetchAmberAlerts implements Action {
  readonly type = FETCH_AMBER_ALERTS;
  constructor(public testCentreId: string) { }
}

export class FetchAmberAlertsFailure implements Action {
  readonly type = FETCH_AMBER_ALERTS_FAILURE;
  constructor(public error: HttpErrorResponse) { }
}

export class AmberAlertResultRecieved implements Action {
  readonly type = AMBER_ALERT_RESULT_RECIEVED;
  constructor(public incidents: ReceivedIncident[]) { }
}

export class UnsubscribeFromAmberAlerts implements Action {
  readonly type = UNSUBSCRIBE_FROM_AMBER_ALERTS;
}

export class ViewIncidentRequested implements Action {
  readonly type = VIEW_INCIDENT_REQUESTED;
}

export class AmberIncidentViewed implements Action {
  readonly type = AMBER_INCIDENT_VIEWED;
  constructor(public incident: ReceivedIncident) { }
}

export class AmberIncidentViewClosed implements Action {
  readonly type = AMBER_INCIDENT_VIEW_CLOSED;
}

export class AmberIncidentDismissed implements Action {
  readonly type = AMBER_INCIDENT_DISMISSED;
}

export type AlertActionTypes =
    SubscribeToAmberAlerts |
    FetchAmberAlerts |
    FetchAmberAlertsFailure |
    AmberAlertResultRecieved |
    UnsubscribeFromAmberAlerts |
    ViewIncidentRequested |
    AmberIncidentViewed |
    AmberIncidentViewClosed |
    AmberIncidentDismissed;
