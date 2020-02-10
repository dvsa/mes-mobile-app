import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { getCompetencyFaults } from '../../../shared/helpers/competency';

export class FaultSummaryCatAM1Helper {

  public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {
    if (this.hasEmergencyStopAndAvoidanceRidingFaults(data)) {
      return [
        ...getCompetencyFaults(data.drivingFaults),
        this.createEmergencyStopFaultSummary(),
        this.createAvoidanceFaultSummary(),
      ];
    }

    if (this.hasEmergencyStopRidingFault(data)) {
      return [
        ...getCompetencyFaults(data.drivingFaults),
        this.createEmergencyStopFaultSummary(),
      ];
    }

    if (this.hasAvoidanceRidingFault(data)) {
      return [
        ...getCompetencyFaults(data.drivingFaults),
        this.createAvoidanceFaultSummary(),
      ];
    }

    return [
      ...getCompetencyFaults(data.drivingFaults),
    ];
  }

  public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {
    if (this.hasEmergencyStopAndAvoidanceSeriousFaults(data)) {
      return [
        ...getCompetencyFaults(data.seriousFaults),
        this.createEmergencyStopFaultSummary(),
        this.createAvoidanceFaultSummary(),
      ];
    }

    if (this.hasEmergencyStopSeriousFault(data)) {
      return [
        ...getCompetencyFaults(data.seriousFaults),
        this.createEmergencyStopFaultSummary(),
      ];
    }

    if (this.hasAvoidanceSeriousFault(data)) {
      return [
        ...getCompetencyFaults(data.seriousFaults),
        this.createAvoidanceFaultSummary(),
      ];
    }

    return [
      ...getCompetencyFaults(data.seriousFaults),
    ];
  }

  public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
    if (this.hasEmergencyStopAndAvoidanceDangerousFaults(data)) {
      return [
        ...getCompetencyFaults(data.dangerousFaults),
        this.createEmergencyStopFaultSummary(),
        this.createAvoidanceFaultSummary(),
      ];
    }

    if (this.hasEmergencyStopDangerousFault(data)) {
      return [
        ...getCompetencyFaults(data.dangerousFaults),
        this.createEmergencyStopFaultSummary(),
      ];
    }

    if (this.hasAvoidanceDangerousFault(data)) {
      return [
        ...getCompetencyFaults(data.dangerousFaults),
        this.createAvoidanceFaultSummary(),
      ];
    }

    return [
      ...getCompetencyFaults(data.dangerousFaults),
    ];
  }

  public static hasEmergencyStopAndAvoidanceRidingFaults(data: TestData) {
    return this.hasEmergencyStopRidingFault(data) && this.hasAvoidanceRidingFault(data);
  }

  public static hasEmergencyStopAndAvoidanceSeriousFaults(data: TestData) {
    return this.hasEmergencyStopSeriousFault(data) && this.hasAvoidanceSeriousFault(data);
  }

  public static hasEmergencyStopAndAvoidanceDangerousFaults(data: TestData) {
    return this.hasEmergencyStopDangerousFault(data) && this.hasAvoidanceDangerousFault(data);
  }

  public static hasEmergencyStopRidingFault(data: TestData): boolean {
    return data.emergencyStop.outcome === 'DF' ? true : false;
  }

  public static hasAvoidanceRidingFault(data: TestData): boolean {
    return data.avoidance.outcome === 'DF' ? true : false;
  }

  public static hasEmergencyStopSeriousFault(data: TestData): boolean {
    return data.emergencyStop.outcome === 'S' ? true : false;
  }

  public static hasAvoidanceSeriousFault(data: TestData): boolean {
    return data.avoidance.outcome === 'S' ? true : false;
  }

  public static hasEmergencyStopDangerousFault(data: TestData): boolean {
    return data.emergencyStop.outcome === 'D' ? true : false;
  }

  public static hasAvoidanceDangerousFault(data: TestData): boolean {
    return data.avoidance.outcome === 'D' ? true : false;
  }

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
