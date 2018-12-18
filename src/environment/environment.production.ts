import { EnviromentFile } from './models/environment.model';

export const environment: EnviromentFile = {
  isRemote: true,
  remoteSettingsUrl: 'assets/config/environmentProduction.json',
  journalEndPoint: 'https://vulv731rce.execute-api.eu-west-1.amazonaws.com/default'
};
