import { forOwn, transform, endsWith } from 'lodash';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import {
  manoeuvreTypeLabels,
  manoeuvreCompetencyLabels,
} from '../../../shared/constants/competencies/catb-manoeuvres';
import { ManoeuvreTypes } from '../../../modules/tests/test-data/test-data.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import {
  MultiFaultAssignableCompetency,
  CommentedCompetency,
  CommentSource,
} from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { getSeriousOrDangerousFaults } from '../debrief.selector';
// TODO - A lot of these are used in multiple places (Debrief, View Test Result, Office),
// should be refactored into a more common area.
export const getManoeuvreFaults = (
  manoeuvres: CatBUniqueTypes.Manoeuvres,
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
          competencyIdentifier: `${type}${manoeuvreCompetencyLabels[key]}` ,
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
  manoeuvres: CatBUniqueTypes.Manoeuvres,
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
  (vehicleChecks: CatBUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: 1,

    };
    vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D && result.push(competency);

    return result;
  };

export const getVehicleCheckSeriousFaults =
  (vehicleChecks: CatBUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: 1,
    };
    vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S && result.push(competency);

    return result;
  };

export const getVehicleCheckDrivingFaults =
  (vehicleChecks: CatBUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
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
        competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
        source: CommentSource.VEHICLE_CHECKS,
        faultCount: 1,
      };
      result.push(competency);
    }
    return result;
  };

export const getControlledStopFault = (
  controlledStop: CatBUniqueTypes.ControlledStop, faultType: CompetencyOutcome): string[] => {
  const result: string[] = [];
  if (!controlledStop) {
    return result;
  }
  controlledStop.fault === faultType && result.push('controlledStop');

  return result;
};

export const getControlledStopFaultAndComment =
  (controlledStop: CatBUniqueTypes.ControlledStop, faultType: CompetencyOutcome): CommentedCompetency[] => {
    const returnCompetencies = [];
    if (!controlledStop || controlledStop.fault !== faultType) {
      return returnCompetencies;
    }
    const result: CommentedCompetency = {
      competencyDisplayName: CompetencyDisplayName.CONTROLLED_STOP,
      competencyIdentifier: 'controlledStop',
      comment: controlledStop.faultComments || '',
      source: CommentSource.CONTROLLED_STOP,
    };
    returnCompetencies.push(result);
    return returnCompetencies;
  };

export const anySeriousFaults = (data: CatBUniqueTypes.TestData): boolean => {
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

export const anyDangerousFaults = (data: CatBUniqueTypes.TestData): boolean => {
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

export const displayDrivingFaultComments = (data: CatBUniqueTypes.TestData): boolean => {
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
