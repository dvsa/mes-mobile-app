import { Action } from '@ngrx/store';
import { FaultPayload } from './test-data.models';

export const ADD_DRIVING_FAULT = '[TestData] Add Driving Fault';

export class AddDrivingFault implements Action {
  constructor(public payload: FaultPayload) { }
  readonly type = ADD_DRIVING_FAULT;
}

export type Types =
  | AddDrivingFault;
