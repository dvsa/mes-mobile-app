import { EnvironmentFile } from './models/environment.model';

export const environment: EnvironmentFile = {
  isRemote: true,
  configUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/configuration/prod',
  authentication: {
    context: '',
    resourceUrl: '',
    clientId: '',
    redirectUrl: '',
    logoutUrl: '',
    openIdConnectUrl: '',
    identityPoolId: '',
    employeeIdKey: '',
  },
};
