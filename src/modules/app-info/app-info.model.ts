
export type AppInfoModel = {
  // We might need to indicate if the information is not available
  // i.e developing in the browser

  versionNumber: string,
  employeeId: string | null,
  error?: any,
  dateConfigLoaded?: string,
};
