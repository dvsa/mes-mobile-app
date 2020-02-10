import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/competency';

export class FaultCountAM1Helper {

  public static getDangerousFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, emergencyStop, avoidance } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const emergencyStopDangerousFaults = (emergencyStop && emergencyStop.outcome === CompetencyOutcome.D) ? 1 : 0;
    const avoidanceDangerousFaults = (avoidance && avoidance.outcome === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      emergencyStopDangerousFaults +
      avoidanceDangerousFaults;

    return result;
  }

  public static getSeriousFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, emergencyStop, avoidance } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const emergencyStopSeriousFaults = (emergencyStop && emergencyStop.outcome === CompetencyOutcome.S) ? 1 : 0;
    const avoidanceSeriousFaults = (avoidance && avoidance.outcome === CompetencyOutcome.S) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      emergencyStopSeriousFaults +
      avoidanceSeriousFaults;

    return result;
  }

  public static getRidingFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, emergencyStop, avoidance } = data;

    const drivingFaultSumOfSimpleCompetencies = getCompetencyFaults(drivingFaults)
      .reduce(((res, faultSummary) => res + faultSummary.faultCount), 0);
    Object.keys(pickBy(drivingFaults)).length;
    const emergencyStopRidingFaults = (emergencyStop && emergencyStop.outcome === CompetencyOutcome.DF) ? 1 : 0;
    const avoidanceRidingFaults = (avoidance && avoidance.outcome === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      drivingFaultSumOfSimpleCompetencies +
      emergencyStopRidingFaults +
      avoidanceRidingFaults;

    return result;
  }
}
