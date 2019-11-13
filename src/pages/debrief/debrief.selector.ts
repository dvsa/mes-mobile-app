import { forOwn } from 'lodash';
import {
  SeriousFaults,
  DrivingFaults,
  DangerousFaults,
  EyesightTest,
  TestResultCommonSchema,
} from '@dvsa/mes-test-schema/categories/Common';
import { competencyLabels } from '../test-report/components/competency/competency.constants';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import {
  MultiFaultAssignableCompetency,
  CommentedCompetency,
  CommentSource,
} from '../../shared/models/fault-marking.model';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { CompetencyDisplayName } from '../../shared/models/competency-display-name';

// TODO - A lot of these are used in multiple places (Debrief, View Test Result, Office),
// should be refactored into a more common area.

export const getSeriousOrDangerousFaults = (faults: SeriousFaults | DangerousFaults): string[] => {
  const faultsEncountered: string[] = [];
  forOwn(faults, (value, key) => {
    if (value) {
      const label = key as keyof typeof competencyLabels;
      faultsEncountered.push(label);
    }
  });
  return faultsEncountered;
};

export const getEyesightTestSeriousFault = (eyesightTest: EyesightTest) => {
  return eyesightTest && eyesightTest.seriousFault ? ['eyesightTest'] : [];
};

export const getEyesightTestSeriousFaultAndComment =
  (eyesightTest: EyesightTest): CommentedCompetency[] => {
    if (!eyesightTest || !eyesightTest.seriousFault) {
      return [];
    }
    return [{
      competencyDisplayName: CompetencyDisplayName.EYESIGHT_TEST,
      competencyIdentifier: 'eyesightTest',
      comment: eyesightTest.faultComments || '',
      source: CommentSource.EYESIGHT_TEST,
    }];
  };

export const getDrivingFaults = (faults: DrivingFaults): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
  const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
  forOwn(faults, (value: number, key, obj) => {
    if (value > 0 && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      const comment = obj[`${key}Comments`] || null;
      const drivingFaultSummary: CommentedCompetency & MultiFaultAssignableCompetency = {
        comment,
        competencyIdentifier: key,
        competencyDisplayName: fullCompetencyLabels[label],
        faultCount: value,
        source: CommentSource.SIMPLE,
      };
      faultsEncountered.push(drivingFaultSummary);
    }
  });
  return faultsEncountered.sort((a, b) => b.faultCount - a.faultCount);
};

/**
 * @param faults
 *
 * Returns an array of CommentedCompetency & MultiFaultAssignableCompetency
 * for each dangerous fault recorded against a candidate.
 */
export const getDangerousFaults =
  (faults: DangerousFaults): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    forOwn(faults, (value, key, obj) => {
      if (value && !key.endsWith('Comments')) {
        const label = key as keyof typeof competencyLabels;
        const comment = obj[`${key}Comments`] || null;
        const dangerousFault: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment,
          competencyIdentifier: key,
          competencyDisplayName: fullCompetencyLabels[label],
          source: CommentSource.SIMPLE,
          faultCount: 1,
        };
        faultsEncountered.push(dangerousFault);
      }
    });
    return faultsEncountered;
  };

/**
 * @param faults
 *
 * Returns an array of CommentedCompetency & MultiFaultAssignableCompetency
 * for each serious fault recorded against a candidate.
 */
export const getSeriousFaults =
  (faults: SeriousFaults): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    forOwn(faults, (value, key, obj) => {
      if (value && !key.endsWith('Comments')) {
        const label = key as keyof typeof competencyLabels;
        const comment = obj[`${key}Comments`] || null;
        const seriousFault: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment,
          competencyIdentifier: key,
          competencyDisplayName: fullCompetencyLabels[label],
          source: CommentSource.SIMPLE,
          faultCount: 1,
        };
        faultsEncountered.push(seriousFault);
      }
    });
    return faultsEncountered;
  };

export const getDrivingFaultComment = (
  faults: DrivingFaults | DangerousFaults | SeriousFaults, competency: string,
): string => {
  return faults[competency] || '';
};

export const getTestOutcome = (test: TestResultCommonSchema): string => {
  switch (test.activityCode) {
    case ActivityCodes.PASS:
      return 'Pass';
    case ActivityCodes.FAIL:
    case ActivityCodes.FAIL_EYESIGHT:
    case ActivityCodes.FAIL_PUBLIC_SAFETY:
    case ActivityCodes.FAIL_CANDIDATE_STOPS_TEST:
      return 'Fail';
    default:
      return 'Terminated';
  }
};
