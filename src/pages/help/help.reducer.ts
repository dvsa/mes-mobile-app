
import * as helpActions from './help.actions';
import { createFeatureSelector } from '@ngrx/store';

export type HelpModel = {
  isRecording: boolean,
  isMessageHistoryVisible: boolean,
  isRecordingHistoryVisible: boolean,
};

export const initialState: HelpModel = {
  isRecording: false,
  isMessageHistoryVisible: false,
  isRecordingHistoryVisible: false,
};

export function helpReducer(state = initialState, action: helpActions.Types) {
  switch (action.type) {
    case helpActions.RECORDING_TOGGLED:
      return {
        ...state,
        isRecording: !state.isRecording,
      };
    case helpActions.MESSAGE_HISTORY_TOGGLED:
      return {
        ...state,
        isMessageHistoryVisible: !state.isMessageHistoryVisible,
      };
    case helpActions.RECORDING_HISTORY_TOGGLED:
      return {
        ...state,
        isRecordingHistoryVisible: !state.isRecordingHistoryVisible,
      };
    default:
      return state;
  }
}

export const getHelpState = createFeatureSelector<HelpModel>('help');
