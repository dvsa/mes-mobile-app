import { FaultSummaryCatAM1Helper } from '../fault-summary.cat-a-mod1';
import { catAM1TestDataStateObject } from './cat-AM1-test-data-mock';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Competencies } from '../../../../modules/tests/test-data/test-data.constants';

describe('FaultSummaryCatAM1Helper', () => {
  const expectedEmergencyStopFault = [
    {
      competencyIdentifier: Competencies.emergencyStop,
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    },
  ];

  const expectedAvoidanceFault = [
    {
      competencyIdentifier: Competencies.avoidance,
      competencyDisplayName: null,
      comment: null,
      faultCount: 1,
    },
  ];

  describe('createEmergencyStopFaultSummary', () => {
    it('should return a fault summary for emergency stop', () => {
      const resultSummary = FaultSummaryCatAM1Helper.getSpeedCheckEmergencyStop({ speedNotMetSeriousFault: true })[0];
      expect(resultSummary.competencyIdentifier).toBe(Competencies.speedCheckEmergency);
      expect(resultSummary.faultCount).toBe(1);
    });
    it('should return a fault summary for avoidance', () => {
      const resultSummary = FaultSummaryCatAM1Helper.getSpeedCheckAvoidance({ speedNotMetSeriousFault: true })[0];
      expect(resultSummary.competencyIdentifier).toBe(Competencies.speedCheckAvoidance);
      expect(resultSummary.faultCount).toBe(1);
    });
  });

  describe('hasEmergencyStopRidingFault', () => {
    it('should return a populated if a riding fault exists', () => {
      catAM1TestDataStateObject.emergencyStop.outcome = CompetencyOutcome.DF;
      expect(FaultSummaryCatAM1Helper.getEmergencyStopFaults(
        catAM1TestDataStateObject.emergencyStop,
        CompetencyOutcome.DF,
      )).toEqual(expectedEmergencyStopFault);
    });
    it('should return an empty array if a riding fault does not exist', () => {
      catAM1TestDataStateObject.emergencyStop.outcome = CompetencyOutcome.S;
      expect(FaultSummaryCatAM1Helper.getEmergencyStopFaults(
        catAM1TestDataStateObject.emergencyStop,
        CompetencyOutcome.DF,
      )).toEqual([]);
    });
  });

  describe('hasEmergencyStopSeriousFault', () => {
    it('should return a popluated array if a serious fault exists', () => {
      catAM1TestDataStateObject.emergencyStop.outcome = CompetencyOutcome.S;
      expect(FaultSummaryCatAM1Helper.getEmergencyStopFaults(
        catAM1TestDataStateObject.emergencyStop,
        CompetencyOutcome.S,
      )).toEqual(expectedEmergencyStopFault);
    });
    it('should return an empty if a serious fault does not exist', () => {
      catAM1TestDataStateObject.emergencyStop.outcome = CompetencyOutcome.DF;
      expect(FaultSummaryCatAM1Helper.getEmergencyStopFaults(
        catAM1TestDataStateObject.emergencyStop,
        CompetencyOutcome.S,
      )).toEqual([]);
    });
  });

  describe('hasEmergencyStopDangerousFault', () => {
    it('should return a populated array if a dangerous fault exists', () => {
      catAM1TestDataStateObject.emergencyStop.outcome = CompetencyOutcome.D;
      expect(FaultSummaryCatAM1Helper.getEmergencyStopFaults(
        catAM1TestDataStateObject.emergencyStop,
        CompetencyOutcome.D,
      )).toEqual(expectedEmergencyStopFault);
    });
    it('should return an empty array if a dangerous fault does not exist', () => {
      catAM1TestDataStateObject.emergencyStop.outcome = CompetencyOutcome.DF;
      expect(FaultSummaryCatAM1Helper.getEmergencyStopFaults(
        catAM1TestDataStateObject.emergencyStop,
        CompetencyOutcome.D,
      )).toEqual([]);
    });
  });

  describe('hasAvoidanceRidingFault', () => {
    it('should return a populated array if a riding fault exists', () => {
      catAM1TestDataStateObject.avoidance.outcome = CompetencyOutcome.DF;
      expect(FaultSummaryCatAM1Helper.getAvoidanceFaults(
        catAM1TestDataStateObject.avoidance,
        CompetencyOutcome.DF,
      )).toEqual(expectedAvoidanceFault);
    });
    it('should return an empty array if a riding fault does not exist', () => {
      catAM1TestDataStateObject.avoidance.outcome = CompetencyOutcome.S;
      expect(FaultSummaryCatAM1Helper.getAvoidanceFaults(
        catAM1TestDataStateObject.avoidance,
        CompetencyOutcome.DF,
      )).toEqual([]);
    });
  });

  describe('hasAvoidanceSeriousFault', () => {
    it('should return a populated array if a serious fault exists', () => {
      catAM1TestDataStateObject.avoidance.outcome = CompetencyOutcome.S;
      expect(FaultSummaryCatAM1Helper.getAvoidanceFaults(
        catAM1TestDataStateObject.avoidance,
        CompetencyOutcome.S,
      )).toEqual(expectedAvoidanceFault);
    });
    it('should return an empty array if a serious fault does not exist', () => {
      catAM1TestDataStateObject.avoidance.outcome = CompetencyOutcome.DF;
      expect(FaultSummaryCatAM1Helper.getAvoidanceFaults(
        catAM1TestDataStateObject.avoidance,
        CompetencyOutcome.S,
      )).toEqual([]);
    });
  });

  describe('hasAvoidanceDangerousFault', () => {
    it('should return a populated array if a dangerous fault exists', () => {
      catAM1TestDataStateObject.avoidance.outcome = CompetencyOutcome.D;
      expect(FaultSummaryCatAM1Helper.getAvoidanceFaults(
        catAM1TestDataStateObject.avoidance,
        CompetencyOutcome.D,
      )).toEqual(expectedAvoidanceFault);
    });
    it('should return an empty array if a dangerous fault does not exist', () => {
      catAM1TestDataStateObject.avoidance.outcome = CompetencyOutcome.DF;
      expect(FaultSummaryCatAM1Helper.getAvoidanceFaults(
        catAM1TestDataStateObject.avoidance,
        CompetencyOutcome.D,
      )).toEqual([]);
    });
  });
});
