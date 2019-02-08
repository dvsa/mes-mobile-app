import { Action } from '@ngrx/store';

export const REFRESH_TOKEN = '[App] Refresh auth token';

export class RefreshToken implements Action {
  readonly type = REFRESH_TOKEN;
}

export type Types = RefreshToken;
