import { RaisedAlertModel, RaisedAlertStatusModel, AlertRequestStatus } from './raised-alert.model';
import { Severity } from '@dvsa/lw-incident-model';

export const getRaisedAlertStatus = (state: RaisedAlertModel, severity: Severity): RaisedAlertStatusModel => {
  const status = new RaisedAlertStatusModel(severity);
  switch (severity) {
    case Severity.Red:
      if (state.redAlert) {
        status.sending = state.redAlert.isSending;
        status.received = state.redAlert.status === AlertRequestStatus.Success;
        status.error = state.redAlert.status === AlertRequestStatus.Fail;
      }
      break;
    case Severity.Amber:
      if (state.amberAlert) {
        status.sending = state.amberAlert.isSending;
        status.received = state.amberAlert.status === AlertRequestStatus.Success;
        status.disabled = !!state.redAlert.sentReceipt || state.amberAlert.status === AlertRequestStatus.Success;
        status.error = state.amberAlert.status === AlertRequestStatus.Fail;
      }
      break;
  }
  return status;
};
