import { Action } from '@ngrx/store';

export const ADD_DRIVING_FAULT = '[TestData] Add Driving Fault';

export class AddDrivingFault implements Action {
  constructor(public payload: string) { }
  readonly type = ADD_DRIVING_FAULT;
}

export type Types =
  | AddDrivingFault;
