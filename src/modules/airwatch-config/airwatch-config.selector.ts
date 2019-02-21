import { AirwatchConfigStateModel, AuthenticationConfigModel } from './airwatch-config.model';

export const getConfigUrl = (airwatchConfig: AirwatchConfigStateModel) => {
  return airwatchConfig.configUrl;
};

export const getAuthenticationConfig = (airwatchConfig: AirwatchConfigStateModel) => {
  return {
    context: airwatchConfig.authenticationContext,
    resourceUrl: airwatchConfig.resourceUrl,
    clientId: airwatchConfig.clientId,
    redirectUrl: airwatchConfig.redirectUrl,
    logoutUrl: airwatchConfig.logoutUrl,
    employeeIdKey: airwatchConfig.employeeIdKey,
  } as AuthenticationConfigModel;
};
