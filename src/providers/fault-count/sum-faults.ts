import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { pickBy, endsWith, sumBy } from 'lodash';

export const sumDrivingFaults = (
  compentencies: number,
  faultManoeuvre: number,
  faultVehicleChecks: number,
  faultBespoke: number): number => {

  const result =
    compentencies +
    faultManoeuvre +
    faultVehicleChecks +
    faultBespoke;

  return result;
}
    
export const sumSeriousFaults = (
  compentencies: number,
  faultManoeuvre: number,
  faultVehicleChecks: number,
  faultEyesight: number,
  faultBespoke: number): number => {

  const result =
    compentencies +
    faultManoeuvre +
    faultVehicleChecks +
    faultEyesight +
    faultBespoke;

  return result;
}
    
export const sumDangerousFaults = (
  compentencies: number,
  faultManoeuvre: number,
  faultVehicleChecks: number,
  faultBespoke: number): number => {

  const result =
    compentencies +
    faultManoeuvre +
    faultVehicleChecks +
    faultBespoke;

  return result;
}

export const sumManoeuvreFaults = (manoeuvres: object, faultType: CompetencyOutcome): number => {
  if (!manoeuvres) {
    return 0;
  }

  const manoeuvresCollection = Object.values(manoeuvres);
  return sumBy(manoeuvresCollection, (manoeuvre) => {
    if (manoeuvre.selected) {
      const dFkeys = pickBy(manoeuvre, (val, key) => endsWith(key, 'Fault') && val === faultType);
      return Object.keys(dFkeys).length;
    }
    return 0;
  });
}
