import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';

export const ADD_DRIVING_FAULT = '[TestData] Add Driving Fault';
export const RECORD_MANOEUVRES_SELECTION = '[TestData] Record Manoeuvres Selection';

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}
export class RecordManoeuvresSelection implements Action {
  constructor(public payload: string) { }
  readonly type = RECORD_MANOEUVRES_SELECTION;
}

export type Types =
  | AddDrivingFault
  | RecordManoeuvresSelection;
