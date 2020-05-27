import { RaisedAlertModel, AlertRequestStatus } from './raised-alert.model';
import { createFeatureSelector } from '@ngrx/store';
import * as alertActions from './raised-alert.actions';

export const initialState: RaisedAlertModel = {
  redAlert: {
    status: null,
    incident: null,
    sentReceipt: null,
    isSending: false,
  },
  amberAlert: {
    status: null,
    incident: null,
    sentReceipt: null,
    isSending: false,
  },
};

export function raisedAlertReducer(
  state = initialState,
  action: alertActions.RaisedAlertActionTypes,
): RaisedAlertModel {
  switch (action.type) {
    case alertActions.SEND_RED_ALERT:
      return {
        ...state,
        redAlert: {
          ...state.redAlert,
          incident: action.incident,
          isSending: true,
        },
      };
    case alertActions.SEND_AMBER_ALERT:
      return {
        ...state,
        amberAlert: {
          ...state.amberAlert,
          incident: action.incident,
          isSending: true,
        },
      };
    case alertActions.RED_ALERT_SENT:
      return {
        ...state,
        redAlert: {
          ...state.redAlert,
          sentReceipt: {
            received: action.sentReceipt.received,
            incidentId: action.sentReceipt.incidentId,
          },
          status: AlertRequestStatus.Success,
          isSending: false,
        },
      };
    case alertActions.AMBER_ALERT_SENT:
      return {
        ...state,
        amberAlert: {
          ...state.amberAlert,
          sentReceipt: {
            received: action.sentReceipt.received,
            incidentId: action.sentReceipt.incidentId,
          },
          status: AlertRequestStatus.Success,
          isSending: false,
        },
      };
    case alertActions.RED_ALERT_SEND_FAILURE:
      return {
        ...state,
        redAlert: {
          ...state.redAlert,
          error: action.error,
          status: AlertRequestStatus.Fail,
          isSending: false,
        },
      };
    case alertActions.AMBER_ALERT_SEND_FAILURE:
      return {
        ...state,
        amberAlert: {
          ...state.amberAlert,
          error: action.error,
          status: AlertRequestStatus.Fail,
          isSending: false,
        },
      };
    case alertActions.RESET_ALERT_STATE:
      return initialState;
    default:
      return state;
  }
}

export const getAlertState = createFeatureSelector<RaisedAlertModel>('loneWorkerRaisedAlerts');
