import { Incident } from '@dvsa/lw-incident-model';

export type AmberAlertModel = {
  incidents: ReceivedIncident[];
  testCentreId?: string;
  modalOpen?: boolean;
  error?: any;
};

export interface ReceivedIncident extends Incident {
  viewed: boolean;
  dismissed: boolean;
}
