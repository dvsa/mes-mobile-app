import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { TestData, SingleFaultCompetencies, Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { get, pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';

export class FaultSummaryCatAM1Helper {

  public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {

    const singleFaultCompetenciesWithDrivingFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.DF,
    );

    return [
      ...getCompetencyFaults(data.drivingFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithDrivingFaults),
      ...FaultSummaryCatAM1Helper.getAvoidanceFaults(data.avoidance, CompetencyOutcome.DF),
      ...FaultSummaryCatAM1Helper.getEmergencyStopFaults(data.emergencyStop, CompetencyOutcome.DF),
    ];
  }

  public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {
    const singleFaultCompetenciesWithDangerousFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.S,
    );

    return [
      ...getCompetencyFaults(data.dangerousFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithDangerousFaults),
      ...FaultSummaryCatAM1Helper.getAvoidanceFaults(data.avoidance, CompetencyOutcome.S),
      ...FaultSummaryCatAM1Helper.getEmergencyStopFaults(data.emergencyStop, CompetencyOutcome.S),
      ...FaultSummaryCatAM1Helper.getSpeedCheckAvoidance(data.avoidance),
      ...FaultSummaryCatAM1Helper.getSpeedCheckEmergencyStop(data.emergencyStop),
    ];
  }

  public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
    const singleFaultCompetenciesWithDangerousFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.D,
    );

    return [
      ...getCompetencyFaults(data.dangerousFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithDangerousFaults),
      ...FaultSummaryCatAM1Helper.getAvoidanceFaults(data.avoidance, CompetencyOutcome.D),
      ...FaultSummaryCatAM1Helper.getEmergencyStopFaults(data.emergencyStop, CompetencyOutcome.D),
    ];
  }

  public static getAvoidanceFaults(avoidance: Avoidance, outcome: CompetencyOutcome): FaultSummary[] {
    const result = [];
    if (get(avoidance, 'outcome') === outcome) {
      result.push(FaultSummaryCatAM1Helper.createFaultSummary(Competencies.avoidance));
    }

    return result;
  }

  public static getEmergencyStopFaults(emergencyStop: EmergencyStop, outcome: CompetencyOutcome): FaultSummary[] {
    const result = [];
    if (get(emergencyStop, 'outcome') === outcome) {
      result.push(FaultSummaryCatAM1Helper.createFaultSummary(Competencies.emergencyStop));
    }

    return result;
  }

  public static getSpeedCheckAvoidance(avoidance: Avoidance): FaultSummary[] {
    const result = [];
    if (get(avoidance, 'speedNotMetSeriousFault')) {
      result.push(FaultSummaryCatAM1Helper.createFaultSummary(Competencies.speedCheckAvoidance));
    }

    return result;
  }

  public static getSpeedCheckEmergencyStop(emergencyStop: EmergencyStop): FaultSummary[] {
    const result = [];
    if (get(emergencyStop, 'speedNotMetSeriousFault')) {
      result.push(FaultSummaryCatAM1Helper.createFaultSummary(Competencies.speedCheckEmergency));
    }

    return result;
  }

  public static createFaultSummary(competencyIdentifier: string): FaultSummary {
    return {
      competencyIdentifier,
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    };
  }
}
