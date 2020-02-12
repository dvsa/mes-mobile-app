import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { TestData, SingleFaultCompetencies } from '@dvsa/mes-test-schema/categories/AM1';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { get, pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export class FaultSummaryCatAM1Helper {

  public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {
    const allCompetencyFaults = [];
    const singleFaultCompetenciesWithDrivingFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.DF,
    );

    const emergencyStopHasSpeedNotMetDrivingFault = get(data, 'emergencyStop.outcome') === CompetencyOutcome.DF;
    const avoidanceHasSpeedNotMetDrivingFault = get(data, 'avoidance.outcome') === CompetencyOutcome.DF;

    if (emergencyStopHasSpeedNotMetDrivingFault) {
      allCompetencyFaults.push(this.createEmergencyStopFaultSummary('Emergency Stop'));
    }
    if (avoidanceHasSpeedNotMetDrivingFault) {
      allCompetencyFaults.push(this.createAvoidanceFaultSummary('Avoidance'));
    }

    allCompetencyFaults.push(...getCompetencyFaults(data.drivingFaults));
    allCompetencyFaults.push(...getCompetencyFaults(singleFaultCompetenciesWithDrivingFaults));

    return allCompetencyFaults;
  }

  public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {
    const allCompetencyFaults = [];
    const emergencyStopHasSpeedNotMetSeriousFault = get(data, 'emergencyStop.speedNotMetSeriousFault') || false;
    const avoidanceHasSpeedNotMetSeriousFault = get(data, 'avoidance.speedNotMetSeriousFault') || false;
    const emergencyStopSeriousFault = get(data, 'emergencyStop.outcome') === CompetencyOutcome.S;
    const avoidanceSeriousFault = get(data, 'avoidance.outcome') === CompetencyOutcome.S;
    const singleFaultCompetenciesWithSeriousFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.S,
    );

    if (emergencyStopHasSpeedNotMetSeriousFault) {
      allCompetencyFaults.push(this.createEmergencyStopFaultSummary('speedCheckEmergency'));
    }
    if (avoidanceHasSpeedNotMetSeriousFault) {
      allCompetencyFaults.push(this.createAvoidanceFaultSummary('speedCheckAvoidance'));
    }
    if (emergencyStopSeriousFault) {
      allCompetencyFaults.push(this.createEmergencyStopFaultSummary('Emergency Stop'));
    }
    if (avoidanceSeriousFault) {
      allCompetencyFaults.push(this.createAvoidanceFaultSummary('Avoidance'));
    }

    allCompetencyFaults.push(...getCompetencyFaults(data.seriousFaults));
    allCompetencyFaults.push(...getCompetencyFaults(singleFaultCompetenciesWithSeriousFaults));

    return allCompetencyFaults;
  }

  public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
    const allCompetencyFaults = [];
    const singleFaultCompetenciesWithDrivingFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.D,
    );

    const emergencyStopHasSpeedNotMetDangerousFault = get(data, 'emergencyStop.outcome') === CompetencyOutcome.D;
    const avoidanceHasSpeedNotMetDangerousFault = get(data, 'avoidance.outcome') === CompetencyOutcome.D;

    if (emergencyStopHasSpeedNotMetDangerousFault) {
      allCompetencyFaults.push(this.createEmergencyStopFaultSummary('Emergency Stop'));
    }
    if (avoidanceHasSpeedNotMetDangerousFault) {
      allCompetencyFaults.push(this.createAvoidanceFaultSummary('Avoidance'));
    }

    allCompetencyFaults.push(...getCompetencyFaults(data.dangerousFaults));
    allCompetencyFaults.push(...getCompetencyFaults(singleFaultCompetenciesWithDrivingFaults));

    return allCompetencyFaults;
  }

  public static createEmergencyStopFaultSummary(competencyIdentifier: string): FaultSummary {
    const faultSummary: FaultSummary = {
      competencyIdentifier,
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    };

    return faultSummary;
  }

  public static createAvoidanceFaultSummary(competencyIdentifier: string): FaultSummary {
    const faultSummary: FaultSummary = {
      competencyIdentifier,
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    };

    return faultSummary;
  }
}
