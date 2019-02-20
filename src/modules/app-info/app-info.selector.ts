import { AppInfoModel } from './app-info.model';

export const getVersionNumber = (appInfo: AppInfoModel) => {
  console.log('APP INFO', appInfo);
  return appInfo.versionNumber;
};
