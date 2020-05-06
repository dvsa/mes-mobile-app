import { AlertModel } from './alert.model';
import { createFeatureSelector } from '@ngrx/store';
import * as alertActions from './alert.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const initialState: AlertModel = {
  redAlert: null,
  amberAlert: null,
  isSending: false,
  error: HttpErrorResponse,
};

export function alertReducer(state = initialState, action: alertActions.AlertActionTypes): AlertModel {
  switch (action.type) {
    case alertActions.SEND_RED_ALERT:
      return {
        ...state,
        redAlert: {
          ...state.redAlert,
          incident: action.incident,
        },
        isSending: true,
        error: { message: '', status: 0, statusText: '' },
      };
    case alertActions.SEND_AMBER_ALERT:
      return {
        ...state,
        amberAlert: {
          ...state.amberAlert,
          incident: action.incident,
        },
        isSending: true,
        error: { message: '', status: 0, statusText: '' },
      };
    case alertActions.RED_ALERT_SENT:
      return {
        ...state,
        redAlert: {
          ...state.redAlert,
          incident: {
            ...state.redAlert.incident,
            received: action.sentReceipt.received,
            id: action.sentReceipt.incidentId,
          },
        },
        isSending: false,
      };
    case alertActions.AMBER_ALERT_SENT:
      return {
        ...state,
        amberAlert: {
          ...state.amberAlert,
          incident: {
            ...state.redAlert.incident,
            received: action.sentReceipt.received,
            id: action.sentReceipt.incidentId,
          },
        },
        isSending: false,
      };
    case alertActions.RED_ALERT_SEND_FAILURE:
      return {
        ...state,
        redAlert: {
          ...state.redAlert,
          error: action.error,
        },
        isSending: false,
      };
    case alertActions.AMBER_ALERT_SEND_FAILURE:
      return {
        ...state,
        amberAlert: {
          ...state.amberAlert,
          error: action.error,
        },
        isSending: false,
      };
    default:
      return state;
  }
}

export const getAlertState = createFeatureSelector<AlertModel>('loneWorkerAlerts');
