import { pickBy, endsWith, sumBy } from 'lodash';
import { CompetencyOutcome } from '../models/competency-outcome';
import { Manoeuvres, Manoeuvre } from '@dvsa/mes-test-schema/categories/ADI2/partial';
import { ManoeuvreTypes } from '../../modules/tests/test-data/test-data.constants';

export const sumManoeuvreFaults = (manoeuvres: Object | Manoeuvres[], faultType: CompetencyOutcome): number => {
  if (!manoeuvres) {
    return 0;
  }

  const inputManoeuvres: Manoeuvres[] = [...(Array.isArray(manoeuvres) ? manoeuvres : [manoeuvres])];
  let manoeuvresCollection: ManoeuvreTypes[] = [];

  return inputManoeuvres.reduce((acc, manoeuvre) => {
    manoeuvresCollection = Object.values(manoeuvre);

    return acc + sumBy<Manoeuvre>(manoeuvresCollection as Manoeuvre[], (manoeuvre) => {
      if (manoeuvre.selected) {
        const dFkeys = pickBy(manoeuvre, (val, key) => endsWith(key, 'Fault') && val === faultType);
        return Object.keys(dFkeys).length;
      }
      return 0;
    });
  }, 0);
};

export const sumManoeuvreArrayFaults = (manoeuvres, faultType: CompetencyOutcome): number => {
  let total: number = 0;

  manoeuvres.forEach((manoeuvre) => {
    total += sumManoeuvreFaults(manoeuvre, faultType);
  });

  return total;
};
