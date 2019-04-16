import { forOwn } from 'lodash';
import { SeriousFaults, DrivingFaults, DangerousFaults, TestData } from '@dvsa/mes-test-schema/categories/B';
import { competencyLabels } from '../test-report/components/competency/competency.constants';
import { FaultCount, fullCompetencyLabels, SeriousFaultsContainer }
 from '../../shared/constants/competencies/catb-competencies';

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
  const faultsEncountered : FaultCount[] = [];
  forOwn(faults, (value: number, key) => {
    if (value > 0 && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push({ propertyName: key, name: fullCompetencyLabels[label], count: value });
    }
  });
  return faultsEncountered.sort((a, b) => b.count - a.count);
};

export const displayDrivingFaultComments = (data: TestData) : boolean => {
  const seriousFaults =  getSeriousOrDangerousFaults(data.seriousFaults);
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
  forOwn(faults, (value, key) => {
    if (value && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push({ propertyName: key, name: fullCompetencyLabels[label] });
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
      faultsEncountered.push({ propertyName: key, name: fullCompetencyLabels[label] });
    }
  });
  return faultsEncountered;
};

export const getDrivingFaultComment = (
  faults: DrivingFaults | DangerousFaults | SeriousFaults, competency: string,
  ): string => {
  return faults[competency] || '';
};
