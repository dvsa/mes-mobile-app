import { DrivingFaults, SeriousFaults, DangerousFaults } from '@dvsa/mes-test-schema/categories/common';
import { CompetencyIdentifiers, FaultSummary, CommentSource } from '../../shared/models/fault-marking.model';
import { fullCompetencyLabels } from '../constants/competencies/competencies';
import { forOwn, isBoolean, isNumber } from 'lodash';

export const getCompetencyFaults = (faults: DrivingFaults | SeriousFaults | DangerousFaults): FaultSummary[] => {
  const faultsEncountered: FaultSummary[] = [];

  forOwn(faults, (value: number, key: string, obj: DrivingFaults| SeriousFaults | DangerousFaults) => {
    const faultCount = calculateFaultCount(value);
    if (faultCount > 0  && !key.endsWith(CompetencyIdentifiers.COMMENTS_SUFFIX)) {
      const label = key as keyof typeof fullCompetencyLabels;
      const comment = obj[`${key}${CompetencyIdentifiers.COMMENTS_SUFFIX}`] || null;
      const faultSummary: FaultSummary = {
        comment,
        faultCount,
        competencyIdentifier: key,
        competencyDisplayName: fullCompetencyLabels[label],
        source: CommentSource.SIMPLE,
      };
      faultsEncountered.push(faultSummary);
    }
  });

  return faultsEncountered.sort((a, b) => b.faultCount - a.faultCount);
};

export const getCompetencyComment = (
  key: string,
  controlFaultComments: string,
  observationFaultComments: string,
): string => {
  if (key === CompetencyIdentifiers.CONTROL_FAULT) {
    return controlFaultComments || '';
  }
  return observationFaultComments || '';
};

export const calculateFaultCount = (value: number | boolean) : number => {
  if (isBoolean(value)) {
    return value ? 1 : 0;
  }
  if (isNumber(value)) {
    return value;
  }
  return 0;
};
