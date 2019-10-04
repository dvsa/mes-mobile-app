import { Action } from '@ngrx/store';

export const HELP_VIEW_DID_ENTER = '[HelpPage] Help view did enter';
export const RECORDING_TOGGLED = '[HelpPage] Recording toggled';
export const MESSAGE_HISTORY_TOGGLED = '[HelpPage] Message history toggled';
export const RECORDING_HISTORY_TOGGLED = '[HelpPage] Recording history toggled';
export const EMERGENCY_SOS_ACTIVATED = '[HelpPage] Emergency SOS activated';

export class HelpViewDidEnter implements Action {
  readonly type = HELP_VIEW_DID_ENTER;
}

export class RecordingToggled implements Action {
  readonly type = RECORDING_TOGGLED;
}

export class MessageHistoryToggled implements Action {
  readonly type = MESSAGE_HISTORY_TOGGLED;
}

export class RecordingHistoryToggled implements Action {
  readonly type = RECORDING_HISTORY_TOGGLED;
}

export class EmergencySOSActivated implements Action {
  readonly type = EMERGENCY_SOS_ACTIVATED;
  constructor(public slotId: number) {
  }
}

export type Types =
  | HelpViewDidEnter
  | RecordingToggled
  | MessageHistoryToggled
  | RecordingHistoryToggled
  | EmergencySOSActivated;
