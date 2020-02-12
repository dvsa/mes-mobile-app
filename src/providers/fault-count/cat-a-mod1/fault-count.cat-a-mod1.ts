import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';

export class FaultCountAM1Helper {

  public static getDangerousFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { singleFaultCompetencies, dangerousFaults, emergencyStop, avoidance } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const controlledStopDangerousFaults = (
      singleFaultCompetencies.controlledStop &&
      singleFaultCompetencies.controlledStop === CompetencyOutcome.D) ? 1 : 0;
    const useOfStandDangerousFaults = (
      singleFaultCompetencies.useOfStand &&
      singleFaultCompetencies.useOfStand === CompetencyOutcome.D) ? 1 : 0;
    const manualHandlingDangerousFaults = (
      singleFaultCompetencies.manualHandling &&
      singleFaultCompetencies.manualHandling === CompetencyOutcome.D) ? 1 : 0;
    const slalomDangerousFaults = (
      singleFaultCompetencies.slalom &&
      singleFaultCompetencies.slalom === CompetencyOutcome.D) ? 1 : 0;
    const slowControlDangerousFaults = (
      singleFaultCompetencies.slowControl &&
      singleFaultCompetencies.slowControl === CompetencyOutcome.D) ? 1 : 0;
    const uTurnDangerousFaults = (
      singleFaultCompetencies.uTurn &&
      singleFaultCompetencies.uTurn === CompetencyOutcome.D) ? 1 : 0;
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
    const { seriousFaults, singleFaultCompetencies, emergencyStop, avoidance } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const controlledStopSeriousFaults = (
      singleFaultCompetencies.controlledStop &&
      singleFaultCompetencies.controlledStop === CompetencyOutcome.S) ? 1 : 0;
    const useOfStandSeriousFaults = (
      singleFaultCompetencies.useOfStand &&
      singleFaultCompetencies.useOfStand === CompetencyOutcome.S) ? 1 : 0;
    const manualHandlingSeriousFaults = (
      singleFaultCompetencies.manualHandling &&
      singleFaultCompetencies.manualHandling === CompetencyOutcome.S) ? 1 : 0;
    const slalomSeriousFaults = (
      singleFaultCompetencies.slalom &&
      singleFaultCompetencies.slalom === CompetencyOutcome.S) ? 1 : 0;
    const slowControlSeriousFaults = (
      singleFaultCompetencies.slowControl &&
      singleFaultCompetencies.slowControl === CompetencyOutcome.S) ? 1 : 0;
    const uTurnSeriousFaults = (
      singleFaultCompetencies.uTurn &&
      singleFaultCompetencies.uTurn === CompetencyOutcome.S) ? 1 : 0;
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
    const { drivingFaults, singleFaultCompetencies, emergencyStop, avoidance } = data;

    const drivingFaultSumOfSimpleCompetencies = getCompetencyFaults(drivingFaults)
      .reduce(((res, faultSummary) => res + faultSummary.faultCount), 0);
    Object.keys(pickBy(drivingFaults)).length;
    const controlledStopDrivingFaults = (
      singleFaultCompetencies.controlledStop &&
      singleFaultCompetencies.controlledStop === CompetencyOutcome.DF) ? 1 : 0;
    const useOfStandDrivingFaults = (
      singleFaultCompetencies.useOfStand &&
      singleFaultCompetencies.useOfStand === CompetencyOutcome.DF) ? 1 : 0;
    const manualHandlingDrivingFaults = (
      singleFaultCompetencies.manualHandling &&
      singleFaultCompetencies.manualHandling === CompetencyOutcome.DF) ? 1 : 0;
    const slalomDrivingFaults = (
      singleFaultCompetencies.slalom &&
      singleFaultCompetencies.slalom === CompetencyOutcome.DF) ? 1 : 0;
    const slowControlDrivingFaults = (
      singleFaultCompetencies.slowControl &&
      singleFaultCompetencies.slowControl === CompetencyOutcome.DF) ? 1 : 0;
    const uTurnDrivingFaults = (
      singleFaultCompetencies.uTurn &&
      singleFaultCompetencies.uTurn === CompetencyOutcome.DF) ? 1 : 0;
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
