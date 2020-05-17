import { AmberAlertModel, ReceivedIncident } from './amber-alert.model';
import { createFeatureSelector } from '@ngrx/store';
import * as alertActions from './amber-alert.actions';

export const initialState: AmberAlertModel = {
  incidents: [],
};

export function amberAlertReducer(state = initialState, action: alertActions.AlertActionTypes): AmberAlertModel {
  let incidents: ReceivedIncident[];

  switch (action.type) {
    case alertActions.SUBSCRIBE_TO_AMBER_ALERTS:
      return {
        ...state,
        testCentreId: action.testCentreId,
      };
    case alertActions.FETCH_AMBER_ALERTS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case alertActions.AMBER_ALERT_RESULT_RECIEVED:
      return {
        ...state,
        incidents: action.incidents,
      };
    case alertActions.UNSUBSCRIBE_FROM_AMBER_ALERTS:
      return {
        ...state,
        testCentreId: undefined,
      };
    case alertActions.AMBER_INCIDENT_VIEWED:
      incidents = state.incidents.map((i) => {
        if (i.id === action.incident.id) {
          return {
            ...i,
            viewed: true,
          };
        }
        return i;
      });

      return {
        ...state,
        incidents,
        modalOpen: true,
      };
    case alertActions.AMBER_INCIDENT_VIEW_CLOSED:
      return {
        ...state,
        modalOpen: false,
      };
    case alertActions.AMBER_INCIDENT_DISMISSED:
      incidents = state.incidents.map((i) => {
        if (i.viewed) {
          return {
            ...i,
            dismissed: true,
          };
        }
        return i;
      });

      return {
        ...state,
        incidents,
      };
    default:
      return state;
  }
}

export const getAmberAlertState = createFeatureSelector<AmberAlertModel>('loneWorkerAmberAlerts');
