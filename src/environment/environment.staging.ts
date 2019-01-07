import { EnvironmentFile } from './models/environment.model';

export const environment: EnvironmentFile = {
  isRemote: false,
  googleAnalyticsId: 'UA-129814222-1',
  userIdDimensionIndex: 1,
  authentication: {
    context: '',
    resourceUrl: '',
    clientId: '',
    redirectUrl: '',
    logoutUrl: '',
  },
  journal: {
    journalUrl: '',
    backgroundRefreshTime: 20000
  }
};
