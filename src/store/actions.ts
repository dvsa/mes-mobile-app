import { Action } from "@ngrx/store";

export const FIRST_ACTION = '[Main] First Action';
export const SECOND_ACTION = '[Main] Second Action';

export class FirstAction implements Action {
  readonly type = FIRST_ACTION
}

export class SecondAction implements Action {
  readonly type = SECOND_ACTION
}