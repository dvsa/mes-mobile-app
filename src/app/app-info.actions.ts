import { Action } from '@ngrx/store';

export const LOAD_APP_INFO = '[AppComponent] Load App Info';

export class LoadAppInfo implements Action {
  readonly type = LOAD_APP_INFO;
}

export type Types =
  LoadAppInfo;
