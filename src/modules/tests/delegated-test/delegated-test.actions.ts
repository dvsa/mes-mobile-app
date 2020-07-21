import { Action } from '@ngrx/store';

export const START_DELEGATED_TEST = '[Delegated Test Actions] Start Delegated test';

export class StartDelegatedTest implements Action {
  readonly type = START_DELEGATED_TEST;
}

export type Types = StartDelegatedTest;
