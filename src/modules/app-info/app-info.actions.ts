import { Action } from '@ngrx/store';

export const LOAD_APP_INFO = '[AppComponent] Load App Info';
export const LOAD_APP_INFO_SUCCESS = '[AppInfoEffects] Load App Info Success';
export const LOAD_APP_INFO_FAILURE = '[AppInfoEffects] Load App Info Failure';
export const LOAD_EMPLOYEE_ID = '[LoginComponent] ';

export class LoadAppInfo implements Action {
  readonly type = LOAD_APP_INFO;
}

export class LoadAppInfoSuccess implements Action {
  readonly type = LOAD_APP_INFO_SUCCESS;
  constructor(public versionNumber: string) {}
}

export class LoadAppInfoFailure implements Action {
  readonly type = LOAD_APP_INFO_FAILURE;
  constructor(public error: any) {}
}

export class LoadEmployeeId implements Action {
  readonly type = LOAD_EMPLOYEE_ID;
  constructor(public employeeId: string) {}
}

export type Types =
  LoadAppInfo |
  LoadAppInfoSuccess |
  LoadAppInfoFailure |
  LoadEmployeeId;
