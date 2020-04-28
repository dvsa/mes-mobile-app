import { AlertModel, AlertStatusModel } from './alert.model';
import { Severity } from '@dvsa/lw-incident-model';

export const getAlertStatus = (state: AlertModel, severity: Severity): AlertStatusModel => {
  const status = new AlertStatusModel(severity);
  switch (severity) {
    case Severity.Red:
      if (state.redAlert) {
        status.sending = state.isSending;
        status.received = !!state.redAlert.id;
      }
      break;
    case Severity.Amber:
      if (state.amberAlert) {
        status.sending = state.isSending;
        status.received = !!state.amberAlert.id;
        status.disabled = !!state.redAlert || !!state.amberAlert.id;
      }
      break;
  }
  return status;
};
