import { EnvironmentFile } from './models/environment.model';

export const environment: EnvironmentFile = {
  isRemote: true,
  configUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/configuration/staging',
  daysToCacheJournalData: 7,
  daysToCacheLogs: 7,
  authentication: {
    context: '',
    resourceUrl: '',
    clientId: '',
    redirectUrl: '',
    logoutUrl: '',
    employeeIdKey: '',
  },
};
