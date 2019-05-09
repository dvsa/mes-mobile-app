import { forOwn, transform, endsWith } from 'lodash';
import {
  SeriousFaults,
  DrivingFaults,
  DangerousFaults,
  TestData,
  Manoeuvres,
  StandardCarTestCATBSchema,
  VehicleChecks,
  ControlledStop,
} from '@dvsa/mes-test-schema/categories/B';
import { competencyLabels } from '../test-report/components/competency/competency.constants';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import { manoeuvreTypeLabels, manoeuvreCompetencyLabels }
  from '../test-report/components/manoeuvre-competency/manoeuvre-competency.constants';
import { ManoeuvreTypes } from '../../modules/tests/test-data/test-data.constants';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import {
  MultiFaultAssignableCompetency,
  CommentedCompetency,
} from '../../shared/models/fault-marking.model';
import { ActivityCodes } from '../../shared/models/activity-codes';

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
      };
      faultsEncountered.push(drivingFaultSummary);
    }
  });
  return faultsEncountered.sort((a, b) => b.faultCount - a.faultCount);
};

export const getManoeuvreFaults = (
  manoeuvres: Manoeuvres,
  faultType: CompetencyOutcome,
): MultiFaultAssignableCompetency[] => {
  const faultsEncountered: MultiFaultAssignableCompetency[] = [];
  forOwn(manoeuvres, (manoeuvre, type: ManoeuvreTypes) => {
    const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {
      if (endsWith(key, 'Fault') && value === faultType) {
        const manoeuvreFaultSummary: MultiFaultAssignableCompetency = {
          competencyIdentifier: type,
          competencyDisplayName: [manoeuvreTypeLabels[type], manoeuvreCompetencyLabels[key]].join(' - '),
          faultCount: 1,
        };
        result.push(manoeuvreFaultSummary);
      }
    }, []);
    faultsEncountered.push(...faults);
  });
  return faultsEncountered;
};

export const getVehicleCheckDangerousFault = (vehicleChecks: VehicleChecks): string[] => {
  const result: string[] = [];

  vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D && result.push('Vehicle checks');

  return result;
};

export const getVehicleCheckSeriousFault = (vehicleChecks: VehicleChecks): string[] => {
  const result: string[] = [];

  vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S && result.push('Vehicle checks');

  return result;
};

export const getVehicleCheckDrivingFault = (vehicleChecks: VehicleChecks): string[] => {
  if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D
    || vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) {
    return [];
  }

  const result: string[] = [];

  if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF
    || vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF) {
    result.push('Vehicle checks');
  }

  return result;
};

export const getControlledStopFault = (controlledStop: ControlledStop, faultType: CompetencyOutcome): string[] => {
  const result: string[] = [];

  controlledStop.fault === faultType && result.push('Controlled stop');

  return result;
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
 * Returns an array of CommentedCompetency for each dangerous fault recorded against a candidate.
 */
export const getDangerousFaults = (faults: DangerousFaults): CommentedCompetency[] => {
  const faultsEncountered: CommentedCompetency[] = [];
  forOwn(faults, (value, key, obj) => {
    if (value && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      const comment = obj[`${key}Comments`] || null;
      const dangerousFault: (CommentedCompetency) = {
        comment,
        competencyIdentifier: key,
        competencyDisplayName: fullCompetencyLabels[label],
      };
      faultsEncountered.push(dangerousFault);
    }
  });
  return faultsEncountered;
};

/**
 * @param faults
 *
 * Returns an array of CommentedCompetency for each serious fault recorded against a candidate.
 */
export const getSeriousFaults = (faults: SeriousFaults): CommentedCompetency[] => {
  const faultsEncountered: CommentedCompetency[] = [];
  forOwn(faults, (value, key, obj) => {
    if (value && !key.endsWith('Comments')) {
      const label = key as keyof typeof competencyLabels;
      const comment = obj[`${key}Comments`] || null;
      const seriousFault: CommentedCompetency = {
        comment,
        competencyIdentifier: key,
        competencyDisplayName: fullCompetencyLabels[label],
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

export const getTestOutcome = (test: StandardCarTestCATBSchema): string => {
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
