import { forOwn } from 'lodash';
import { SeriousFaults, DrivingFaults, DangerousFaults } from '@dvsa/mes-test-schema/categories/B';
import { competencyLabels } from '../test-report/components/competency/competency.constants';
import { FaultCount, fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';

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
  forOwn(faults, (value, key) => {
    if (value > 0) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push({ name: fullCompetencyLabels[label], count: value });
    }
  });
  return faultsEncountered.sort((a, b) => b.count - a.count);
};
