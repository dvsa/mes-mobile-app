import { EnviromentFile } from './models/environment.model';

export const environment : EnviromentFile = {
  isRemote: false,
  googleAnalyticsId: 'UA-129814222-1',
  userIdDimensionIndex: 1,
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: 'https://graph.windows.net',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner-services://uk.gov.dvsa.mobile-examiner-services',
  },
};
