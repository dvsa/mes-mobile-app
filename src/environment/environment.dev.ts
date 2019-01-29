import { EnvironmentFile } from './models/environment.model';

export const environment : EnvironmentFile = {
  isRemote: false,
  googleAnalyticsId: 'UA-129814222-1',
  userIdDimensionIndex: 1,
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner://uk.gov.dvsa.mobile-examiner',
    logoutUrl: 'https://login.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/oauth2/logout',
    openIdConnectUrl: 'sts.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801',
    identityPoolId: 'eu-west-1:f5a0346e-9bbb-4153-affd-bbe59cd5b7a3',
    employeeIdKey: 'extn.employeeId'
  },
  aws: {
    region: 'eu-west-1',
  },
  journal: {
    journalUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/journals/{staffNumber}/personal',
    backgroundRefreshTime: 20000
  }
};
