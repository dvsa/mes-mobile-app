import { AirwatchConfigStateModel } from './airwatch-config.model';

export const getConfigUrl = (airwatchConfig: AirwatchConfigStateModel) => {
  return airwatchConfig.configUrl;
};
