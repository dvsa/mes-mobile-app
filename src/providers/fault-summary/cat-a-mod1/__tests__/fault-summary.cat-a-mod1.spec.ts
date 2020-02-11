import { FaultSummaryCatAM1Helper } from '../fault-summary.cat-a-mod1';
// import { catAM1TestDataStateObject } from './cat-AM1-test-data-mock';

describe('FaultSummaryCatAM1Helper', () => {
  describe('createEmergencyStopFaultSummary', () => {
    it('should return a fault summary for emergency stop', () => {
      const resultSummary = FaultSummaryCatAM1Helper.createEmergencyStopFaultSummary();
      expect(resultSummary.competencyIdentifier).toBe('speedCheckEmergency');
      expect(resultSummary.faultCount).toBe(1);
    });
    it('should return a fault summary for avoidance', () => {
      const resultSummary = FaultSummaryCatAM1Helper.createAvoidanceFaultSummary();
      expect(resultSummary.competencyIdentifier).toBe('speedCheckAvoidance');
      expect(resultSummary.faultCount).toBe(1);
    });
  });

  describe('hasEmergencyStopRidingFault', () => {
  //   it('should return true if a riding fault exists', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopRidingFault(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a riding fault does not exist', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'S';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopRidingFault(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasEmergencyStopSeriousFault', () => {
  //   it('should return true if a serious fault exists', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'S';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopSeriousFault(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a serious fault does not exist', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopSeriousFault(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasEmergencyStopDangerousFault', () => {
  //   it('should return true if a dangerous fault exists', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'D';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopDangerousFault(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a dangerous fault does not exist', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopDangerousFault(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasAvoidanceRidingFault', () => {
  //   it('should return true if a riding fault exists', () => {
  //     catAM1TestDataStateObject.avoidance.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasAvoidanceRidingFault(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a riding fault does not exist', () => {
  //     catAM1TestDataStateObject.avoidance.outcome = 'S';
  //     expect(FaultSummaryCatAM1Helper.hasAvoidanceRidingFault(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasAvoidanceSeriousFault', () => {
  //   it('should return true if a serious fault exists', () => {
  //     catAM1TestDataStateObject.avoidance.outcome = 'S';
  //     expect(FaultSummaryCatAM1Helper.hasAvoidanceSeriousFault(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a serious fault does not exist', () => {
  //     catAM1TestDataStateObject.avoidance.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasAvoidanceSeriousFault(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasAvoidanceDangerousFault', () => {
  //   it('should return true if a dangerous fault exists', () => {
  //     catAM1TestDataStateObject.avoidance.outcome = 'D';
  //     expect(FaultSummaryCatAM1Helper.hasAvoidanceDangerousFault(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a dangerous fault does not exist', () => {
  //     catAM1TestDataStateObject.avoidance.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasAvoidanceDangerousFault(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasEmergencyStopAndAvoidanceRidingFaults', () => {
  //   it('should return true if a riding fault exists for both emergency stop and avoidance', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'DF';
  //     catAM1TestDataStateObject.avoidance.outcome = 'DF';
  //     expect(
  // FaultSummaryCatAM1Helper.hasEmergencyStopAndAvoidanceRidingFaults(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a riding fault does not exist for both emergency stop and avoidance', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'DF';
  //     catAM1TestDataStateObject.avoidance.outcome = 'D';
  //     expect(
  //      FaultSummaryCatAM1Helper.hasEmergencyStopAndAvoidanceRidingFaults(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasEmergencyStopAndAvoidanceSeriousFaults', () => {
  //   it('should return true if a serious fault exists for both emergency stop and avoidance', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'S';
  //     catAM1TestDataStateObject.avoidance.outcome = 'S';
  //     expect(
  // FaultSummaryCatAM1Helper.hasEmergencyStopAndAvoidanceSeriousFaults(catAM1TestDataStateObject)).toBe(true);
  //   });
  //   it('should return false if a serious fault does not exist for both emergency stop and avoidance', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'S';
  //     catAM1TestDataStateObject.avoidance.outcome = 'D';
  //     expect(
  // FaultSummaryCatAM1Helper.hasEmergencyStopAndAvoidanceSeriousFaults(catAM1TestDataStateObject)).toBe(false);
  //   });
  // });

  // describe('hasEmergencyStopAndAvoidanceDangerousFaults', () => {
  //   it('should return true if a serious fault exists for both emergency stop and avoidance', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'D';
  //     catAM1TestDataStateObject.avoidance.outcome = 'D';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopAndAvoidanceDangerousFaults(catAM1TestDataStateObject))
  //       .toBe(true);
  //   });
  //   it('should return false if a serious fault does not exist for both emergency stop and avoidance', () => {
  //     catAM1TestDataStateObject.emergencyStop.outcome = 'D';
  //     catAM1TestDataStateObject.avoidance.outcome = 'DF';
  //     expect(FaultSummaryCatAM1Helper.hasEmergencyStopAndAvoidanceDangerousFaults(catAM1TestDataStateObject))
  //       .toBe(false);
  //   });
  });

});
