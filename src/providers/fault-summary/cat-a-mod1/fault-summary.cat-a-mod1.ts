import { FaultSummary, CommentSource } from '../../../shared/models/fault-marking.model';
import { TestData, SingleFaultCompetencies, Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { get, pickBy, startsWith } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { fullCompetencyLabels } from '../../../shared/constants/competencies/competencies';

export class FaultSummaryCatAM1Helper {

  public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {

    const singleFaultCompetenciesWithDrivingFaults: SingleFaultCompetencies = FaultSummaryCatAM1Helper
      .matchCompetenciesIncludingComments(
        data.singleFaultCompetencies, CompetencyOutcome.DF,
      );

    return [
      ...getCompetencyFaults(data.drivingFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithDrivingFaults),
      ...FaultSummaryCatAM1Helper.getAvoidanceFaults(data.avoidance, CompetencyOutcome.DF),
      ...FaultSummaryCatAM1Helper.getEmergencyStopFaults(data.emergencyStop, CompetencyOutcome.DF),
    ];
  }

  public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {

    const singleFaultCompetenciesWithSeriousFaults: SingleFaultCompetencies = FaultSummaryCatAM1Helper
      .matchCompetenciesIncludingComments(
        data.singleFaultCompetencies, CompetencyOutcome.S,
      );

    return [
      ...getCompetencyFaults(data.seriousFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithSeriousFaults),
      ...FaultSummaryCatAM1Helper.getAvoidanceFaults(data.avoidance, CompetencyOutcome.S),
      ...FaultSummaryCatAM1Helper.getEmergencyStopFaults(data.emergencyStop, CompetencyOutcome.S),
      ...FaultSummaryCatAM1Helper.getSpeedCheckAvoidance(data.avoidance),
      ...FaultSummaryCatAM1Helper.getSpeedCheckEmergencyStop(data.emergencyStop),
    ];
  }

  public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
    const singleFaultCompetenciesWithDangerousFaults: SingleFaultCompetencies = FaultSummaryCatAM1Helper
     .matchCompetenciesIncludingComments(
        data.singleFaultCompetencies, CompetencyOutcome.D,
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
      result.push(FaultSummaryCatAM1Helper.createFaultSummary(
        Competencies.avoidance, fullCompetencyLabels.avoidance, avoidance.comments));
    }

    return result;
  }

  public static getEmergencyStopFaults(emergencyStop: EmergencyStop, outcome: CompetencyOutcome): FaultSummary[] {
    const result = [];
    if (get(emergencyStop, 'outcome') === outcome) {
      result.push(FaultSummaryCatAM1Helper.createFaultSummary(
        Competencies.emergencyStop, fullCompetencyLabels.emergencyStop, emergencyStop.comments));
    }

    return result;
  }

  public static getSpeedCheckAvoidance(avoidance: Avoidance): FaultSummary[] {
    const result = [];
    if (get(avoidance, 'speedNotMetSeriousFault')) {
      const source = `${CommentSource.SPEED_REQUIREMENTS}-${Competencies.speedCheckAvoidance}`;

      result.push(FaultSummaryCatAM1Helper.createFaultSummary(
        Competencies.speedCheckAvoidance, fullCompetencyLabels.speedCheckAvoidance, avoidance.comments, source));
    }

    return result;
  }

  public static getSpeedCheckEmergencyStop(emergencyStop: EmergencyStop): FaultSummary[] {
    const result = [];
    if (get(emergencyStop, 'speedNotMetSeriousFault')) {
      const source = `${CommentSource.SPEED_REQUIREMENTS}-${Competencies.speedCheckEmergency}`;

      result.push(FaultSummaryCatAM1Helper.createFaultSummary(
        Competencies.speedCheckEmergency, fullCompetencyLabels.speedCheckEmergency, emergencyStop.comments, source));
    }

    return result;
  }

  public static matchCompetenciesIncludingComments(
    singleFaultCompetencies: SingleFaultCompetencies,
    outcome: CompetencyOutcome,
  ): Partial<SingleFaultCompetencies> {

    const matchedCompetencies = pickBy(singleFaultCompetencies, val => val === outcome);
    const matchedComments = pickBy(
      singleFaultCompetencies,
      (val, key) => Object.keys(matchedCompetencies).filter(val => startsWith(key, val)).length > 0,
    );

    return {
      ...matchedCompetencies,
      ...matchedComments,
    };

  }

  public static createFaultSummary(competencyIdentifier: string,
                                   competencyName: string,
                                   competencyComments: string,
                                   source: string = CommentSource.SIMPLE): FaultSummary {
    return {
      competencyIdentifier,
      source,
      competencyDisplayName: competencyName,
      comment: competencyComments || '',
      faultCount: 1,
    };
  }
}
