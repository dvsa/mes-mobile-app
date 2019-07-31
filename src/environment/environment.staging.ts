import { EnvironmentFile } from './models/environment.model';

export const environment: EnvironmentFile = {
  isRemote: true,
  configUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/configuration/staging',
  daysToCacheJournalData: 7,
  daysToCacheLogs: 7,
  logsPostApiKey: '',
  logsApiUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/logs/staging',
  logsAutoSendInterval: 6000,
  authentication: {
    context: '',
    resourceUrl: '',
    clientId: '',
    redirectUrl: '',
    logoutUrl: '',
    employeeIdKey: '',
  },
};
