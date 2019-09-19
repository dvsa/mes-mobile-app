import { Action } from '@ngrx/store';

export const LOAD_APP_INFO = '[AppComponent] Load App Info';
export const LOAD_APP_INFO_SUCCESS = '[AppInfoEffects] Load App Info Success';
export const LOAD_APP_INFO_FAILURE = '[AppInfoEffects] Load App Info Failure';
export const LOAD_EMPLOYEE_ID = '[LoginComponent] Load employee ID';
export const LOAD_EMPLOYEE_NAME = '[LoginComponent] Load employee name';
export const LOAD_EMPLOYEE_NAME_SUCCESS = '[LoginComponent] Load employee name success';
export const LOAD_CONFIG_SUCCESS = '[AppInfoEffects] Load Config Success';
export const SET_DATE_CONFIG_LOADED = '[AppInfoEffects] Set Date Config Loaded';
export const APP_SUSPENDED = '[AppInfoEffects] App Suspended';
export const APP_RESUMED = '[AppInfoEffects] App Resumed';
export const RESTART_APP = '[AppInfoEffects] Restart App';

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

export class LoadEmployeeName implements Action {
  readonly type = LOAD_EMPLOYEE_NAME;
}

export class LoadEmployeeNameSuccess implements Action {
  readonly type = LOAD_EMPLOYEE_NAME_SUCCESS;
  constructor(public employeeName: string) {}
}

export class LoadConfigSuccess implements Action {
  readonly type = LOAD_CONFIG_SUCCESS;
}

export class SetDateConfigLoaded implements Action {
  readonly type = SET_DATE_CONFIG_LOADED;
  constructor(public refreshDate: string) {}
}

export class AppSuspended implements Action {
  readonly type = APP_SUSPENDED;
}

export class AppResumed implements Action {
  readonly type = APP_RESUMED;
}

export class RestartApp implements Action {
  readonly type = RESTART_APP;
}

export type Types =
  LoadAppInfo |
  LoadAppInfoSuccess |
  LoadAppInfoFailure |
  LoadEmployeeId |
  LoadEmployeeName |
  LoadEmployeeNameSuccess |
  LoadConfigSuccess |
  SetDateConfigLoaded |
  AppSuspended |
  AppResumed |
  RestartApp;
