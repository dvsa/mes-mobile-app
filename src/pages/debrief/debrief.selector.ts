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
  EyesightTest,
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
  CommentSource,
} from '../../shared/models/fault-marking.model';
import { ActivityCodes } from '../../shared/models/activity-codes';

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

export const getManoeuvreFaults = (
  manoeuvres: Manoeuvres,
  faultType: CompetencyOutcome,
): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
  const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
  forOwn(manoeuvres, (manoeuvre, type: ManoeuvreTypes) => {
    let competencyComment = '';
    const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {
      if (endsWith(key, 'Fault') && value === faultType) {
        if (key === 'controlFault') {
          competencyComment = manoeuvre.controlFaultComments || '';
        } else {
          competencyComment = manoeuvre.observationFaultComments || '';
        }
        const manoeuvreFaultSummary: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment: competencyComment || '',
          competencyIdentifier: type,
          competencyDisplayName: [manoeuvreTypeLabels[type], manoeuvreCompetencyLabels[key]].join(' - '),
          source: `${CommentSource.MANOEUVRES}-${type}-${manoeuvreCompetencyLabels[key]}`,
          faultCount: 1,
        };
        result.push(manoeuvreFaultSummary);
      }
    }, []);
    faultsEncountered.push(...faults);
  });
  return faultsEncountered;
};

export const getManoeuvreFaultsCount = (
  manoeuvres: Manoeuvres,
  faultType: CompetencyOutcome,
): number => {
  let faultCount = 0;
  forOwn(manoeuvres, (manoeuvre, type: ManoeuvreTypes, key) => {
    if (manoeuvre.selected) {
      forOwn(manoeuvre, (value, key) => {
        if (endsWith(key, 'Fault') && value === faultType) {
          faultCount = faultCount + 1;
        }
      });
    }
  });
  return faultCount;
};

export const getVehicleCheckDangerousFaults =
  (vehicleChecks: VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: 'Show Me/Tell Me',
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: 1,

    };
    vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D && result.push(competency);

    return result;
  };

export const getVehicleCheckSeriousFaults =
  (vehicleChecks: VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CommentSource.VEHICLE_CHECKS,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: 1,
    };
    vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S && result.push(competency);

    return result;
  };

export const getVehicleCheckDrivingFaults =
  (vehicleChecks: VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    if (!vehicleChecks || !vehicleChecks.showMeQuestion || !vehicleChecks.tellMeQuestion) {
      return result;
    }
    if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D
      || vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) {
      return result;
    }

    if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF
      || vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF) {
      const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
        comment: vehicleChecks.showMeTellMeComments || '',
        competencyIdentifier: CommentSource.VEHICLE_CHECKS,
        competencyDisplayName: 'Show Me/Tell Me',
        source: CommentSource.VEHICLE_CHECKS,
        faultCount: 1,
      };
      result.push(competency);
    }
    return result;
  };

export const getControlledStopFault = (controlledStop: ControlledStop, faultType: CompetencyOutcome): string[] => {
  const result: string[] = [];
  if (!controlledStop) {
    return result;
  }
  controlledStop.fault === faultType && result.push('controlledStop');

  return result;
};

export const getControlledStopFaultAndComment =
  (controlledStop: ControlledStop, faultType: CompetencyOutcome): CommentedCompetency[] => {
    const returnCompetencies = [];
    if (!controlledStop || controlledStop.fault !== faultType) {
      return returnCompetencies;
    }
    const result: CommentedCompetency = {
      competencyDisplayName: 'Controlled Stop',
      competencyIdentifier: 'controlledStop',
      comment: controlledStop.faultComments || '',
      source: CommentSource.CONTROLLED_STOP,
    };
    returnCompetencies.push(result);
    return returnCompetencies;
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
      competencyDisplayName: 'Eyesight Test',
      competencyIdentifier: 'eyesightTest',
      comment: eyesightTest.faultComments || '',
      source: CommentSource.EYESIGHT_TEST,
    }];
  };

export const anySeriousFaults = (data: TestData): boolean => {
  const seriousFaults = getSeriousOrDangerousFaults(data.seriousFaults);
  if (seriousFaults.length > 0) {
    return true;
  }
  const vehicleCheckSeriousFaults = getVehicleCheckSeriousFaults(data.vehicleChecks);
  if (vehicleCheckSeriousFaults.length > 0) {
    return true;
  }
  const controlledStopSeriousFault = getControlledStopFault(data.controlledStop, CompetencyOutcome.S);
  if (controlledStopSeriousFault.length > 0) {
    return true;
  }
  return false;
};

export const anyDangerousFaults = (data: TestData): boolean => {
  const dangerousFaults = getSeriousOrDangerousFaults(data.dangerousFaults);
  if (dangerousFaults.length > 0) {
    return true;
  }
  const vehicleCheckDangerousFaults = getVehicleCheckDangerousFaults(data.vehicleChecks);
  if (vehicleCheckDangerousFaults.length > 0) {
    return true;
  }
  const controlledStopDangerousFault = getControlledStopFault(data.controlledStop, CompetencyOutcome.D);
  if (controlledStopDangerousFault.length > 0) {
    return true;
  }
  return false;
};

export const displayDrivingFaultComments = (data: TestData): boolean => {
  if (anySeriousFaults(data) || anyDangerousFaults(data)) {
    return false;
  }
  let drivingFaultCount: number = 0;

  forOwn(data.drivingFaults, (value: number, key) => {
    if (value > 0) {
      drivingFaultCount = drivingFaultCount + value;
    }
  });
  if (data.controlledStop && data.controlledStop.selected && data.controlledStop.fault === CompetencyOutcome.DF) {
    drivingFaultCount = drivingFaultCount + 1;
  }
  if (data.vehicleChecks) {
    const checks = data.vehicleChecks;
    if (checks.showMeQuestion && checks.showMeQuestion.outcome === CompetencyOutcome.DF) {
      drivingFaultCount = drivingFaultCount + 1;
    }
    if (checks.tellMeQuestion && checks.tellMeQuestion.outcome === CompetencyOutcome.DF) {
      drivingFaultCount = drivingFaultCount + 1;
    }
  }

  drivingFaultCount = drivingFaultCount + getManoeuvreFaultsCount(data.manoeuvres, CompetencyOutcome.DF);

  return drivingFaultCount > 15;
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
