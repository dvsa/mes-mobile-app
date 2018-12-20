import { EnviromentFile } from './models/environment.model';

export const environment : EnviromentFile = {
  isRemote: false,
  googleAnalyticsId: 'UA-129814222-1',
  userIdDimensionIndex: 1,
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: 'https://graph.windows.net',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner://uk.gov.dvsa.mobile-examiner',
    logoutUrl: 'ttps://login.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/oauth2/logout',
  },
  journal: {
    journalUrl: 'https://vulv731rce.execute-api.eu-west-1.amazonaws.com/default'
  }
};
