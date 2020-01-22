import { pickBy, endsWith, sumBy } from 'lodash';
import { CompetencyOutcome } from '../models/competency-outcome';

export const sumManoeuvreFaults = (manoeuvres: Object, faultType: CompetencyOutcome): number => {
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
};
