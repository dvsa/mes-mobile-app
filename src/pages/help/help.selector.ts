import { HelpModel } from './help.reducer';

export const getIsRecording = (help: HelpModel) => help.isRecording;

export const getIsMessageHistoryVisible = (help: HelpModel) => help.isMessageHistoryVisible;

export const getIsRecordingHistoryVisible = (help: HelpModel) => help.isRecordingHistoryVisible;
