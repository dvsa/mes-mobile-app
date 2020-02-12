import { DrivingFaults, SeriousFaults, DangerousFaults } from '@dvsa/mes-test-schema/categories/common';
import { CompetencyIdentifiers, FaultSummary, CommentSource } from '../models/fault-marking.model';
import { competencyLabels } from '../../pages/test-report/components/competency/competency.constants';
import { fullCompetencyLabels } from '../constants/competencies/catb-competencies';
import { forOwn, isBoolean, isNumber } from 'lodash';
import { CompetencyOutcome } from '../models/competency-outcome';
import { SingleFaultCompetencies } from '@dvsa/mes-test-schema/categories/AM1';

const competencyOutcomes = [CompetencyOutcome.DF, CompetencyOutcome.S, CompetencyOutcome.D];

export const getCompetencyFaults = (
  faults: DrivingFaults | SeriousFaults | DangerousFaults | SingleFaultCompetencies,
): FaultSummary[] => {
  const faultsEncountered: FaultSummary[] = [];

  forOwn(
    faults,
    (value: number | boolean | CompetencyOutcome, key: string, obj: DrivingFaults| SeriousFaults | DangerousFaults) => {
      const faultCount = calculateFaultCount(value);
      if (faultCount > 0  && !key.endsWith(CompetencyIdentifiers.COMMENTS_SUFFIX)) {
        const label = key as keyof typeof competencyLabels;
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
    },
  );

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

export const calculateFaultCount = (value: number | boolean | CompetencyOutcome) : number => {
  if (isBoolean(value)) {
    return value ? 1 : 0;
  }
  if (isNumber(value)) {
    return value;
  }
  if (competencyOutcomes.includes(value)) {
    return 1;
  }
  return 0;
};
