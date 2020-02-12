import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { TestData, SingleFaultCompetencies } from '@dvsa/mes-test-schema/categories/AM1';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { get, pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export class FaultSummaryCatAM1Helper {

  public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {
    console.log('### data');
    console.log(data);

    const singleFaultCompetenciesWithDrivingFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.DF,
    );

    return [
      ...getCompetencyFaults(data.drivingFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithDrivingFaults),
    ];
  }

  public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {
    const allCompetencyFaults = [];
    const emergencyStopHasSpeedNotMetSeriousFault = get(data, 'emergencyStop.speedNotMetSeriousFault') || false;
    const avoidanceHasSpeedNotMetSeriousFault = get(data, 'avoidance.speedNotMetSeriousFault') || false;
    const singleFaultCompetenciesWithSeriousFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.S,
    );

    if (emergencyStopHasSpeedNotMetSeriousFault) {
      allCompetencyFaults.push(this.createEmergencyStopFaultSummary());
    }
    if (avoidanceHasSpeedNotMetSeriousFault) {
      allCompetencyFaults.push(this.createAvoidanceFaultSummary());
    }

    allCompetencyFaults.push(...getCompetencyFaults(data.seriousFaults));
    allCompetencyFaults.push(...getCompetencyFaults(singleFaultCompetenciesWithSeriousFaults));

    return allCompetencyFaults;
  }

  public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
    const singleFaultCompetenciesWithDangerousFaults: SingleFaultCompetencies = pickBy(
      data.singleFaultCompetencies, val => val === CompetencyOutcome.D,
    );

    return [
      ...getCompetencyFaults(data.dangerousFaults),
      ...getCompetencyFaults(singleFaultCompetenciesWithDangerousFaults),
    ];
  }

  // public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {
  //   if (this.hasEmergencyStopAndAvoidanceRidingFaults(data)) {
  //     return [
  //       ...getCompetencyFaults(data.drivingFaults),
  //       this.createEmergencyStopFaultSummary(),
  //       this.createAvoidanceFaultSummary(),
  //     ];
  //   }

  //   if (this.hasEmergencyStopRidingFault(data)) {
  //     return [
  //       ...getCompetencyFaults(data.drivingFaults),
  //       this.createEmergencyStopFaultSummary(),
  //     ];
  //   }

  //   if (this.hasAvoidanceRidingFault(data)) {
  //     return [
  //       ...getCompetencyFaults(data.drivingFaults),
  //       this.createAvoidanceFaultSummary(),
  //     ];
  //   }

  //   return [
  //     ...getCompetencyFaults(data.drivingFaults),
  //   ];
  // }

  // public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {
  //   if (this.hasEmergencyStopAndAvoidanceSeriousFaults(data)) {
  //     return [
  //       ...getCompetencyFaults(data.seriousFaults),
  //       this.createEmergencyStopFaultSummary(),
  //       this.createAvoidanceFaultSummary(),
  //     ];
  //   }

  //   if (this.hasEmergencyStopSeriousFault(data)) {
  //     return [
  //       ...getCompetencyFaults(data.seriousFaults),
  //       this.createEmergencyStopFaultSummary(),
  //     ];
  //   }

  //   if (this.hasAvoidanceSeriousFault(data)) {
  //     return [
  //       ...getCompetencyFaults(data.seriousFaults),
  //       this.createAvoidanceFaultSummary(),
  //     ];
  //   }

  //   return [
  //     ...getCompetencyFaults(data.seriousFaults),
  //   ];
  // }

  // public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
  //   if (this.hasEmergencyStopAndAvoidanceDangerousFaults(data)) {
  //     return [
  //       ...getCompetencyFaults(data.dangerousFaults),
  //       this.createEmergencyStopFaultSummary(),
  //       this.createAvoidanceFaultSummary(),
  //     ];
  //   }

  //   if (this.hasEmergencyStopDangerousFault(data)) {
  //     return [
  //       ...getCompetencyFaults(data.dangerousFaults),
  //       this.createEmergencyStopFaultSummary(),
  //     ];
  //   }

  //   if (this.hasAvoidanceDangerousFault(data)) {
  //     return [
  //       ...getCompetencyFaults(data.dangerousFaults),
  //       this.createAvoidanceFaultSummary(),
  //     ];
  //   }

  //   return [
  //     ...getCompetencyFaults(data.dangerousFaults),
  //   ];
  // }

  // public static hasEmergencyStopAndAvoidanceRidingFaults(data: TestData) {
  //   return this.hasEmergencyStopRidingFault(data) && this.hasAvoidanceRidingFault(data);
  // }

  // public static hasEmergencyStopAndAvoidanceSeriousFaults(data: TestData) {
  //   return this.hasEmergencyStopSeriousFault(data) && this.hasAvoidanceSeriousFault(data);
  // }

  // public static hasEmergencyStopAndAvoidanceDangerousFaults(data: TestData) {
  //   return this.hasEmergencyStopDangerousFault(data) && this.hasAvoidanceDangerousFault(data);
  // }

  // public static hasEmergencyStopRidingFault(data: TestData): boolean {
  //   return data.emergencyStop.outcome === 'DF' ? true : false;
  // }

  // public static hasAvoidanceRidingFault(data: TestData): boolean {
  //   return data.avoidance.outcome === 'DF' ? true : false;
  // }

  // public static hasEmergencyStopSeriousFault(data: TestData): boolean {
  //   return data.emergencyStop.outcome === 'S' ? true : false;
  // }

  // public static hasAvoidanceSeriousFault(data: TestData): boolean {
  //   return data.avoidance.outcome === 'S' ? true : false;
  // }

  // public static hasEmergencyStopDangerousFault(data: TestData): boolean {
  //   return data.emergencyStop.outcome === 'D' ? true : false;
  // }

  // public static hasAvoidanceDangerousFault(data: TestData): boolean {
  //   return data.avoidance.outcome === 'D' ? true : false;
  // }

  public static createEmergencyStopFaultSummary(): FaultSummary {
    const faultSummary: FaultSummary = {
      competencyIdentifier: 'speedCheckEmergency',
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    };

    return faultSummary;
  }

  public static createAvoidanceFaultSummary(): FaultSummary {
    const faultSummary: FaultSummary = {
      competencyIdentifier: 'speedCheckAvoidance',
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    };

    return faultSummary;
  }
}
