import { DrivingFaults, SeriousFaults, DangerousFaults } from '@dvsa/mes-test-schema/categories/Common';
import { CompetencyIdentifiers, FaultSummary, CommentSource } from '../../shared/models/fault-marking.model';
import { competencyLabels } from '../../pages/test-report/components/competency/competency.constants';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import { forOwn, isBoolean, isNumber } from 'lodash';

export const getCompetencyFaults = (faults: DrivingFaults | SeriousFaults | DangerousFaults): FaultSummary[] => {
  const faultsEncountered: FaultSummary[] = [];

  forOwn(faults, (value: number, key: string, obj: DrivingFaults| SeriousFaults | DangerousFaults) => {
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
  });

  return faultsEncountered.sort((a, b) => b.faultCount - a.faultCount);
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
