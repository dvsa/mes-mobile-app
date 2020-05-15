import { MdmConfig } from '@dvsa/mes-config-schema/mdm-config';

export const environment: MdmConfig = {
  isRemote: true,
  configUrl: 'https://mattc.mes.dev-dvsacloud.uk/v1/configuration/dev',
  daysToCacheLogs: 7,
  enableDevTools: true,
  logoutClearsTestPersistence: true,
  logsPostApiKey: '',
  logsApiUrl: 'https://mattc.mes.dev-dvsacloud.uk/v1/logs',
  logsAutoSendInterval: 6000,
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner-app://uk.gov.dvsa.mobile-examiner-app',
    logoutUrl: 'https://login.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/oauth2/logout',
    employeeIdKey: 'employeeid',
  },
};
