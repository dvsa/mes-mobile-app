import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export class FaultCountAM1Helper {

  public static getDangerousFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, useOfStand, manualHandling,
      slalom, slowControl, uTurn, controlledStop, emergencyStop, avoidance } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const controlledStopDangerousFaults = (controlledStop && controlledStop === CompetencyOutcome.D) ? 1 : 0;
    const useOfStandDangerousFaults = (useOfStand && useOfStand === CompetencyOutcome.D) ? 1 : 0;
    const manualHandlingDangerousFaults = (manualHandling && manualHandling === CompetencyOutcome.D) ? 1 : 0;
    const slalomDangerousFaults = (slalom && slalom === CompetencyOutcome.D) ? 1 : 0;
    const slowControlDangerousFaults = (slowControl && slowControl === CompetencyOutcome.D) ? 1 : 0;
    const uTurnDangerousFaults = (uTurn && uTurn === CompetencyOutcome.D) ? 1 : 0;
    const emergencyStopDangerousFaults = (emergencyStop && emergencyStop.outcome === CompetencyOutcome.D) ? 1 : 0;
    const avoidanceDangerousFaults = (avoidance && avoidance.outcome === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      controlledStopDangerousFaults +
      useOfStandDangerousFaults +
      manualHandlingDangerousFaults +
      slalomDangerousFaults +
      slowControlDangerousFaults +
      uTurnDangerousFaults +
      emergencyStopDangerousFaults +
      avoidanceDangerousFaults;

    return result;
  }

  public static getSeriousFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, useOfStand, manualHandling,
      slalom, slowControl, uTurn, controlledStop, emergencyStop, avoidance } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const controlledStopSeriousFaults = (controlledStop && controlledStop === CompetencyOutcome.S) ? 1 : 0;
    const useOfStandSeriousFaults = (useOfStand && useOfStand === CompetencyOutcome.S) ? 1 : 0;
    const manualHandlingSeriousFaults = (manualHandling && manualHandling === CompetencyOutcome.S) ? 1 : 0;
    const slalomSeriousFaults = (slalom && slalom === CompetencyOutcome.S) ? 1 : 0;
    const slowControlSeriousFaults = (slowControl && slowControl === CompetencyOutcome.S) ? 1 : 0;
    const uTurnSeriousFaults = (uTurn && uTurn === CompetencyOutcome.S) ? 1 : 0;
    const emergencyStopSeriousFaults = (emergencyStop && emergencyStop.outcome === CompetencyOutcome.S) ? 1 : 0;
    const avoidanceSeriousFaults = (avoidance && avoidance.outcome === CompetencyOutcome.S) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      controlledStopSeriousFaults +
      useOfStandSeriousFaults +
      manualHandlingSeriousFaults +
      slalomSeriousFaults +
      slowControlSeriousFaults +
      uTurnSeriousFaults +
      emergencyStopSeriousFaults +
      avoidanceSeriousFaults;

    return result;
  }

  public static getRidingFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, useOfStand, manualHandling,
      slalom, slowControl, uTurn, controlledStop, emergencyStop, avoidance } = data;

    const drivingFaultSumOfSimpleCompetencies = Object.keys(pickBy(drivingFaults)).length;
    const controlledStopDrivingFaults = (controlledStop && controlledStop === CompetencyOutcome.DF) ? 1 : 0;
    const useOfStandDrivingFaults = (useOfStand && useOfStand === CompetencyOutcome.DF) ? 1 : 0;
    const manualHandlingDrivingFaults = (manualHandling && manualHandling === CompetencyOutcome.DF) ? 1 : 0;
    const slalomDrivingFaults = (slalom && slalom === CompetencyOutcome.DF) ? 1 : 0;
    const slowControlDrivingFaults = (slowControl && slowControl === CompetencyOutcome.DF) ? 1 : 0;
    const uTurnDrivingFaults = (uTurn && uTurn === CompetencyOutcome.DF) ? 1 : 0;
    const emergencyStopRidingFaults = (emergencyStop && emergencyStop.outcome === CompetencyOutcome.DF) ? 1 : 0;
    const avoidanceRidingFaults = (avoidance && avoidance.outcome === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      drivingFaultSumOfSimpleCompetencies +
      controlledStopDrivingFaults +
      useOfStandDrivingFaults +
      manualHandlingDrivingFaults +
      slalomDrivingFaults +
      slowControlDrivingFaults +
      uTurnDrivingFaults +
      emergencyStopRidingFaults +
      avoidanceRidingFaults;

    return result;
  }
}
