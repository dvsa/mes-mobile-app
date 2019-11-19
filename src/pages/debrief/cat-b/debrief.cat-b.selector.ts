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

export const getManoeuvreFaults = (
  manoeuvres: CatBUniqueTypes.Manoeuvres,
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
