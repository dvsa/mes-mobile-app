import { Incident, Severity } from '@dvsa/lw-incident-model';

export type AlertModel = {
  isSending: boolean;
  redAlert: Incident | null;
  amberAlert: Incident | null;
  error?: any;
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

  public canSendAlert = (): boolean => !this.sending && !this.received && !this.disabled;
}

export type StoreModel = { loneWorkerAlerts: AlertModel };
