import { Incident, Severity } from '@dvsa/lw-incident-model';
import { HttpErrorResponse } from '@angular/common/http';

export type AlertModel = {
  isSending: boolean;
  redAlert: AlertWrapper;
  amberAlert: AlertWrapper;
  error?: any;
};

export type AlertWrapper = {
  incident: Incident | null,
  status: AlertRequestStatus,
  error?: HttpErrorResponse,
};

export type AlertSendReciept = {
  incidentId: string;
  received: Date;
};

export class AlertStatusModel {
  constructor(
    public alertType: Severity,
  ) { }

  public sending: boolean;
  public received: boolean;
  public disabled: boolean;
  public error: boolean;

  public canSendAlert = (): boolean => !this.sending && !this.received && !this.disabled;
}

export type StoreModel = { loneWorkerAlerts: AlertModel };

export enum AlertRequestStatus {
  Success,
  Fail,
}
