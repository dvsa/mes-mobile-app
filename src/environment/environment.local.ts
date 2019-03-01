import { LocalEnvironmentFile } from './models/environment.model';

export const environment: LocalEnvironmentFile = {
  isRemote: false,
  configUrl: 'https://yvqsvwe4nh.execute-api.eu-west-1.amazonaws.com/szabi/configuration/{scope}',
  googleAnalyticsId: 'UA-129489007-3',
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner://uk.gov.dvsa.mobile-examiner',
    logoutUrl: 'https://login.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/oauth2/logout',
    employeeIdKey: 'extn.employeeId',
  },
  journal: {
    journalUrl: '/assets/mock/local-journal.json',
    autoRefreshInterval: 100000,
    numberOfDaysToView: 7,
  },
  logging: {
    url: '',
    autoSendInterval: 1000 * 60,
  },
};
