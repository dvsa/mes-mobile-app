import { AppInfoModel } from './app-info.model';

export const getVersionNumber = (appInfo: AppInfoModel) => appInfo.versionNumber;

export const getEmployeeId = (appInfo: AppInfoModel) => appInfo.employeeId;
