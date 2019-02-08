import { EnvironmentFile, LocalEnvironmentFile } from '../../../environment/models/environment.model';

export const remoteEnvironmentMock: EnvironmentFile = {
  isRemote: true,
  configUrl: 'remote-url',
  authentication: {
    context: 'remote-authentication-context',
    resourceUrl: 'remote-authentication-resource-url',
    clientId: 'remote-authentication-client-id',
    redirectUrl: 'remote-authentication-redirect-url',
    logoutUrl: 'remote-logout-url',
    openIdConnectUrl: 'remote-openIdConnectUrl',
    identityPoolId: 'remote-identityPoolId',
    employeeIdKey: 'remote-employeeIdKey'
  },
};

export const localEnvironmentMock: LocalEnvironmentFile = {
  isRemote: false,
  configUrl: 'https://www.example.com/api/v1/config/dev',
  googleAnalyticsId: 'local-ga-id',
  authentication: {
    context: 'local-authentication-context',
    resourceUrl: 'local-authentication-resource-url',
    clientId: 'local-authentication-client-id',
    redirectUrl: 'local-authentication-redirect-url',
    logoutUrl: 'local-logout-url',
    openIdConnectUrl: 'local-openIdConnectUrl',
    identityPoolId: 'local-identityPoolId',
    employeeIdKey: 'local-employeeIdKey'
  },
  journal: {
    journalUrl: 'https://www.example.com/api/v1/journals/{staffNumber}/personal',
    autoRefreshInterval: 1000 * 60 * 15,
    numberOfDaysToView: 7,
  }
};
