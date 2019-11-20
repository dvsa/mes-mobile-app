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

// TODO move methods that return a count and comments into a FaultSummaryProvider
export const getVehicleCheckSeriousFaults =
  (vehicleChecks: CatBEUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const showMeFaults = vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);
    const tellMeFaults = vehicleChecks.tellMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);

    const seriousFaultCount = showMeFaults.length + tellMeFaults.length === 5 ? 1 : 0;
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: seriousFaultCount,
    };
    seriousFaultCount > 0  && result.push(competency);

    return result;
  };
export const getVehicleCheckDrivingFaults =
  (vehicleChecks: CatBEUniqueTypes.VehicleChecks): (CommentedCompetency & MultiFaultAssignableCompetency)[] => {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    if (!vehicleChecks || !vehicleChecks.showMeQuestions || !vehicleChecks.tellMeQuestions) {
      return result;
    }

    const dangerousFaults = vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.D);
    const seriousFaults = vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.S);

    if (dangerousFaults.length > 0 || seriousFaults.length > 0) {
      return result;
    }

    const showMeDFFault = vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);
    const tellMeDFFault = vehicleChecks.tellMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);
    const totalFaults = showMeDFFault.length + tellMeDFFault.length;
    if (totalFaults > 0) {
      // TODO refactor fault count to use faultcount provider if possible
      const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
        comment: vehicleChecks.showMeTellMeComments || '',
        competencyIdentifier: CommentSource.VEHICLE_CHECKS,
        competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
        source: CommentSource.VEHICLE_CHECKS,
        faultCount: totalFaults === 5 ? 4 : totalFaults,
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
    const showMeFault = data.vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);
    const tellMeFault = data.vehicleChecks.tellMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);
    drivingFaultCount = drivingFaultCount + showMeFault.length + tellMeFault.length;
  }

  drivingFaultCount = drivingFaultCount + getManoeuvreFaultsCount(data.manoeuvres, CompetencyOutcome.DF);

  return drivingFaultCount > 15;
};
