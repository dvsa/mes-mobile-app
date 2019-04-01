import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';

export const ADD_DRIVING_FAULT = '[TestData] Add Driving Fault';
export const RECORD_MENOEUVRES_SELECTION = '[TestData] Record Menoeuvres Selection';

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}
export class RecordMenoeuvresSelection implements Action {
  constructor(public payload: string) { }
  readonly type = RECORD_MENOEUVRES_SELECTION;
}

export type Types =
  | AddDrivingFault
  | RecordMenoeuvresSelection;
