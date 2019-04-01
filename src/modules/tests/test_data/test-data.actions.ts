import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';
import { Competencies } from './test-data.constants';

export const ADD_DRIVING_FAULT = '[TestData] Add Driving Fault';

export const ADD_SERIOUS_FAULT = '[TestData] Add Serious Fault';

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}

export class AddSeriousFault implements Action {
  constructor(public payload: Competencies) { }
  readonly type = ADD_SERIOUS_FAULT;
}

export type Types =
  | AddDrivingFault
  | AddSeriousFault;
