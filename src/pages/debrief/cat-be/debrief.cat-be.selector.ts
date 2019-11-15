import { forOwn, transform, endsWith } from 'lodash';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import {
  manoeuvreTypeLabels,
  manoeuvreCompetencyLabels,
} from '../../../shared/constants/competencies/catbe-manoeuvres';
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
  manoeuvres: CatBEUniqueTypes.Manoeuvres,
  faultType: CompetencyOutcome,
): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
  const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
  forOwn(manoeuvres, (manoeuvre, type: ManoeuvreTypes) => {
    const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {

      if (endsWith(key, 'Fault') && value === faultType) {

        const competencyComment = getCompetencyComment(
          key,
          manoeuvre.controlFaultComments,
          manoeuvre.observationFaultComments);

        result.push(createManoeuvreFault(key, type, competencyComment));
      }
    }, []);
    faultsEncountered.push(...faults);
  });
  return faultsEncountered;
};

const getCompetencyComment = (key: string,
                              controlFaultComments: string,
                              observationFaultComments: string) => {
  if (key === 'controlFault') {
    return controlFaultComments || '';
  }
  return observationFaultComments || '';
};

const createManoeuvreFault = (key: string,
                              type: ManoeuvreTypes,
                              competencyComment: string): CommentedCompetency & MultiFaultAssignableCompetency => {
  const manoeuvreFaultSummary : CommentedCompetency & MultiFaultAssignableCompetency = {
    comment: competencyComment || '',
    competencyIdentifier: `${type}${manoeuvreCompetencyLabels[key]}` ,
    competencyDisplayName:`${manoeuvreTypeLabels[type]} - ${manoeuvreCompetencyLabels[key]}`,
    source: `${CommentSource.MANOEUVRES}-${type}-${manoeuvreCompetencyLabels[key]}`,
    faultCount: 1,
  };
  return manoeuvreFaultSummary;
};

export const getManoeuvreFaultsCount = (
  manoeuvres: CatBEUniqueTypes.Manoeuvres,
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
  (vehicleChecks: CatBEUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
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
    const faultIndex = vehicleChecks.showMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.D);
    faultIndex >= 0  && result.push(competency);

    return result;
  };

export const getVehicleCheckSeriousFaults =
  (vehicleChecks: CatBEUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
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
    const faultIndex = vehicleChecks.showMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.S);
    faultIndex >= 0  && result.push(competency);

    return result;
  };

export const getVehicleCheckDrivingFaults =
  (vehicleChecks: CatBEUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    if (!vehicleChecks || !vehicleChecks.showMeQuestions || !vehicleChecks.tellMeQuestions) {
      return result;
    }
    const dangerousFaultIndex = vehicleChecks.showMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.D);
    const seriousFaultIndex = vehicleChecks.showMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.S);

    if (dangerousFaultIndex >= 0 || seriousFaultIndex >= 0) {
      return result;
    }

    const showMeDFFault = vehicleChecks.showMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.DF);
    const tellMeDFFault = vehicleChecks.tellMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.DF);
    if (showMeDFFault >= 0
      || tellMeDFFault >= 0) {
      const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
        comment: vehicleChecks.showMeTellMeComments || '',
        competencyIdentifier: CommentSource.VEHICLE_CHECKS,
        competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
        source: CommentSource.VEHICLE_CHECKS,
        faultCount: 1, // TODO REVIEW LOGIC AND CALCULATE FAULT COUNT from show me tell me colletcions
      };
      result.push(competency);
    }
    return result;
  };

export const getUncoupleRecoupleFault = (
  uncoupleRecouple: CatBEUniqueTypes.UncoupleRecouple, faultType: CompetencyOutcome): string[] => {
  const result: string[] = [];
  if (!uncoupleRecouple) {
    return result;
  }
  uncoupleRecouple.fault === faultType && result.push('uncoupleRecouple');

  return result;
};

export const getUncoupleRecoupleFaultAndComment =
  (uncoupleRecouple: CatBEUniqueTypes.UncoupleRecouple, faultType: CompetencyOutcome): CommentedCompetency[] => {
    const returnCompetencies = [];
    if (!uncoupleRecouple || uncoupleRecouple.fault !== faultType) {
      return returnCompetencies;
    }
    const result: CommentedCompetency = {
      competencyDisplayName: CompetencyDisplayName.UNCOUPLE_RECOUPLE,
      competencyIdentifier: 'uncoupleRecouple',
      comment: uncoupleRecouple.faultComments || '',
      source: CommentSource.UNCOUPLE_RECOUPLE,
    };
    returnCompetencies.push(result);
    return returnCompetencies;
  };

export const anySeriousFaults = (data: CatBEUniqueTypes.TestData): boolean => {
  const seriousFaults = getSeriousOrDangerousFaults(data.seriousFaults);
  if (seriousFaults.length > 0) {
    return true;
  }
  const vehicleCheckSeriousFaults = getVehicleCheckSeriousFaults(data.vehicleChecks);
  if (vehicleCheckSeriousFaults.length > 0) {
    return true;
  }
  const uncoupleRecoupleSeriousFault = getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.S);
  if (uncoupleRecoupleSeriousFault.length > 0) {
    return true;
  }
  return false;
};

export const anyDangerousFaults = (data: CatBEUniqueTypes.TestData): boolean => {
  const dangerousFaults = getSeriousOrDangerousFaults(data.dangerousFaults);
  if (dangerousFaults.length > 0) {
    return true;
  }
  const vehicleCheckDangerousFaults = getVehicleCheckDangerousFaults(data.vehicleChecks);
  if (vehicleCheckDangerousFaults.length > 0) {
    return true;
  }
  const uncoupleRecoupleDangerousFault = getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.D);
  if (uncoupleRecoupleDangerousFault.length > 0) {
    return true;
  }
  return false;
};

export const displayDrivingFaultComments = (data: CatBEUniqueTypes.TestData): boolean => {
  if (anySeriousFaults(data) || anyDangerousFaults(data)) {
    return false;
  }
  let drivingFaultCount: number = 0;

  forOwn(data.drivingFaults, (value: number, key) => {
    if (value > 0) {
      drivingFaultCount = drivingFaultCount + value;
    }
  });
  if (data.uncoupleRecouple && data.uncoupleRecouple.selected && data.uncoupleRecouple.fault === CompetencyOutcome.DF) {
    drivingFaultCount = drivingFaultCount + 1;
  }
  if (data.vehicleChecks) {
      // TODO may need to sum up the driving fault counts.... plus look at logic of serious fault
    const checks = data.vehicleChecks;
    if (checks.showMeQuestions &&
        checks.showMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.DF) >= 0) {
      drivingFaultCount = drivingFaultCount + 1;
    }
    if (checks.tellMeQuestions &&
        checks.tellMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.DF) >= 0) {
      drivingFaultCount = drivingFaultCount + 1;
    }
  }

  drivingFaultCount = drivingFaultCount + getManoeuvreFaultsCount(data.manoeuvres, CompetencyOutcome.DF);

  return drivingFaultCount > 15;
};
