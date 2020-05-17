import { AmberAlertModel, ReceivedIncident } from './amber-alert.model';
import { createSelector } from '@ngrx/store';
import { getAmberAlertState } from './amber-alert.reducer';

export const getTestCentreId = createSelector(
  getAmberAlertState,
  (state: AmberAlertModel): string => state.testCentreId,
);

export const getAmberIncidents = createSelector(
  getAmberAlertState,
  (state: AmberAlertModel): ReceivedIncident[] => state.incidents,
);

export const getAmberModalState = createSelector(
  getAmberAlertState,
  (state: AmberAlertModel): boolean => state.modalOpen,
);
