export type AirwatchConfigStateModel = {
  configUrl: string,
  authenticationContext: string
  resourceUrl: string,
  clientId: string,
  redirectUrl: string,
  logoutUrl: string,
  employeeIdKey: string,
  error?: any,
};

export type AuthenticationConfigModel = {
  context: string
  resourceUrl: string,
  clientId: string,
  redirectUrl: string,
  logoutUrl: string,
  employeeIdKey: string,
};
