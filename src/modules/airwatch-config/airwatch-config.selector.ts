import { AirwatchConfigStateModel } from './airwatch-config.model';

export const getAirwatchConfig = (airwatchConfig: AirwatchConfigStateModel) => {
  return airwatchConfig;
};

export const getAirwatchError = (airwatchConfig: AirwatchConfigStateModel) => {
  return airwatchConfig.error;
};
