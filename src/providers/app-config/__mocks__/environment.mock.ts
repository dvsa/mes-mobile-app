import { EnvironmentFile } from '../../../environment/models/environment.model';

export const remoteEnvironmentMock : EnvironmentFile = {
  isRemote: true,
  remoteSettingsUrl: 'remote-url'
}

export const localEnvironmentMock: EnvironmentFile = {
  isRemote: false,
  googleAnalyticsId: 'local-ga-id',
  userIdDimensionIndex: 2018,
  authentication: {
    context: 'local-authentication-context',
    resourceUrl: 'local-authentication-resource-url',
    clientId: 'local-authentication-client-id',
    redirectUrl: 'local-authentication-redirect-url',
    logoutUrl: 'local-logout-url',
    openIdConnectUrl: 'local-openIdConnectUrl',
    identityPoolId: 'local-identityPoolId',
  },
  aws: {
    region: 'aws-region'
  },
  journal: {
    journalUrl: 'https://www.example.com/path'
  }
}
