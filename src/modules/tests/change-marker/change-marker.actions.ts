import { Action } from '@ngrx/store';

export const SET_CHANGE_MARKER = '[Test Actions] Set the change marker for the test';

export class SetChangeMarker implements Action {
  readonly type = SET_CHANGE_MARKER;

  constructor(public changeMarker: boolean) {}
}

export type Types = SetChangeMarker;
