import { forOwn, transform, endsWith } from 'lodash';
import {
  SeriousFaults,
  DrivingFaults,
  DangerousFaults,
  TestData,
  Manoeuvres,
} from '@dvsa/mes-test-schema/categories/B';
import { competencyLabels } from '../test-report/components/competency/competency.constants';
import { FaultCount, fullCompetencyLabels, SeriousFaultsContainer }
  from '../../shared/constants/competencies/catb-competencies';
import { manoeuvreTypeLabels, manoeuvreCompetencyLabels }
  from '../test-report/components/manoeuvre-competency/manoeuvre-competency.constants';
import { ManoeuvreTypes } from '../../modules/tests/test_data/test-data.constants';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';

export const getSeriousOrDangerousFaults = (faults: SeriousFaults | DangerousFaults): string[] => {
  const faultsEncountered: string[] = [];
  forOwn(faults, (value, key) => {
    if (value) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push(fullCompetencyLabels[label]);
    }
  });
  return faultsEncountered;
};

export const getDrivingFaults = (faults: DrivingFaults): FaultCount[] => {
  const faultsEncountered: FaultCount[] = [];
  forOwn(faults, (value: number, key) => {
    if (value > 0 && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push({ propertyName: key, name: fullCompetencyLabels[label], count: value });
    }
  });
  return faultsEncountered.sort((a, b) => b.count - a.count);
};

export const getManoeuvreFaults = (manoeuvres: Manoeuvres, faultType: CompetencyOutcome): FaultCount[] => {
  const faultsEncountered: FaultCount[] = [];
  forOwn(manoeuvres, (manoeuvre, type: ManoeuvreTypes) => {
    const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {
      if (endsWith(key, 'Fault') && value === faultType) {
        result.push({
          name: [manoeuvreTypeLabels[type], manoeuvreCompetencyLabels[key]].join(' - '),
          count: 1,
        });
      }
    }, []);
    faultsEncountered.push(...faults);
  });
  return faultsEncountered;
};

export const displayDrivingFaultComments = (data: TestData): boolean => {
  const seriousFaults = getSeriousOrDangerousFaults(data.seriousFaults);
  const dangerousFaults = getSeriousOrDangerousFaults(data.dangerousFaults);
  let drivingFaultCount: number = 0;

  if (seriousFaults.length > 0 || dangerousFaults.length > 0) {
    return false;
  }

  forOwn(data.drivingFaults, (value: number, key) => {
    if (value > 0) {
      drivingFaultCount = drivingFaultCount + value;
    }
  });
  return drivingFaultCount > 15;
};

/**
 * @param faults
 *
 * Returns a container of array holding the propertyName and fullCompetencyLabel for each dangerous
 * fault recorded against a candidate.
 *
 * Is used to populate properties in dangerous-fault-comment.html for the entry of comments
 * relating to each dangerous fault.
 */
export const getDangerousFaults = (faults: DangerousFaults): SeriousFaultsContainer[] => {
  const faultsEncountered: SeriousFaultsContainer[] = [];
  forOwn(faults, (value, key, obj) => {
    if (value && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      const comment = obj[`${key}Comments`] || null;
      faultsEncountered.push({ comment, propertyName: key, name: fullCompetencyLabels[label] });
    }
  });
  return faultsEncountered;
};

/**
 * @param faults
 *
 * Returns a container of array holding the propertyName and fullCompetencyLabel for each serious
 * fault recorded against a candidate.
 *
 * Is used to populate properties in serious-fault-comment.html for the entry of comments
 * relating to each dangerous fault.
 */
export const getSeriousFaults = (faults: SeriousFaults): SeriousFaultsContainer[] => {
  const faultsEncountered: SeriousFaultsContainer[] = [];
  forOwn(faults, (value, key) => {
    if (value && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push({ propertyName: key, name: fullCompetencyLabels[label], comment: value as string });
    }
  });
  return faultsEncountered;
};

export const getDrivingFaultComment = (
  faults: DrivingFaults | DangerousFaults | SeriousFaults, competency: string,
): string => {
  return faults[competency] || '';
};
