import { AirwatchConfigModel } from '../../../providers/airwatch-config/airwatch-config.model';
import { AirwatchConfigStateModel } from '../airwatch-config.model';

export const airwatchConfigModelData: AirwatchConfigModel = {
  configUrl: 'https://example.com/api/v1/config/dev',
  authenticationContext: 'context',
  resourceUrl: 'resourceUrl',
  clientId: 'clientId',
  redirectUrl: 'redirectUrl',
  logoutUrl: 'logoutUrl',
  employeeIdKey: 'employeeKeyId',
};

export const airwatchConfigStateModelData : AirwatchConfigStateModel = {
  configUrl: 'https://www.example.com/api/v1/config/dev',
  authenticationContext: 'context',
  resourceUrl: 'resourceUrl',
  clientId: 'clientId',
  redirectUrl: 'redirectUrl',
  logoutUrl: 'logoutUrl',
  employeeIdKey: 'employeeKeyId',
};
