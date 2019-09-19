import { AppInfoModel } from './app-info.model';

export const getVersionNumber = (appInfo: AppInfoModel) => appInfo.versionNumber;

export const getEmployeeId = (appInfo: AppInfoModel) => appInfo.employeeId;

export const getEmployeeName = (appInfo: AppInfoModel) => appInfo.employeeName;

export const getDateConfigLoaded = (appInfo: AppInfoModel) => appInfo.dateConfigLoaded;
