import { TestBed } from '@angular/core/testing';
import { TestReportValidatorProvider } from '../test-report-validator';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  validTestCatBE,
  validTestCatB,
  validTestCatCNonTrailer,
  validTestCatCTrailer,
  legalRequirementsCatCNonTrailer,
  legalRequirementsCatCTrailer,
} from '../__mocks__/test-result.mock';
import { legalRequirementsLabels } from '../../../shared/constants/legal-requirements/legal-requirements.constants';
import { TestData } from '@dvsa/mes-test-schema/categories/common';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { configureTestSuite } from 'ng-bullet';
import { SpeedCheckState } from '../test-report-validator.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

describe('TestReportValidator', () => {
  const cCats = [
    { category: TestCategory.C, validTest: validTestCatCNonTrailer, legalReqs: legalRequirementsCatCNonTrailer },
    { category: TestCategory.C1, validTest: validTestCatCNonTrailer, legalReqs: legalRequirementsCatCNonTrailer },
    { category: TestCategory.CE, validTest: validTestCatCTrailer, legalReqs: legalRequirementsCatCTrailer },
    { category: TestCategory.C1E, validTest: validTestCatCTrailer, legalReqs: legalRequirementsCatCTrailer },
  ];

  let testReportValidatorProvider: TestReportValidatorProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        TestReportValidatorProvider,
        FaultCountProvider,
      ],
    });
  });

  beforeEach(() => {
    testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
  });

  describe('isTestReportValid', () => {
    it('should return true if the test report is valid on a Cat B test', () => {
      const result = testReportValidatorProvider.isTestReportValid(validTestCatB, TestCategory.B);
      expect(result).toEqual(true);
    });
    it('should return false if the test report is not valid for a Cat B test', () => {
      const result = testReportValidatorProvider.isTestReportValid({}, TestCategory.B);
      expect(result).toEqual(false);
    });
    it('should return true if the test report is valid for a Cat BE test', () => {
      const result = testReportValidatorProvider.isTestReportValid(validTestCatBE , TestCategory.BE);
      expect(result).toEqual(true);
    });
    it('should return false if the test report is not valid for a Cat BE test', () => {
      const result = testReportValidatorProvider.isTestReportValid({}, TestCategory.BE);
      expect(result).toEqual(false);
    });

    cCats.forEach((cat) => {
      it(`should return true if the test report is valid for a Cat ${cat.category} test`, () => {
        const result = testReportValidatorProvider.isTestReportValid(cat.validTest, cat.category);
        expect(result).toEqual(true);
      });
      it(`should return false if the test report is not valid for a Cat ${cat} test`, () => {
        const result = testReportValidatorProvider.isTestReportValid({}, cat.category);
        expect(result).toEqual(false);
      });
    });

  });
  describe('getMissingLegalRequirements', () => {
    it('should return an empty array if the legal requirements are met for a Cat B test', () => {
      const result = testReportValidatorProvider.getMissingLegalRequirements(validTestCatB, TestCategory.B);
      expect(result.length).toEqual(0);
    });
    it('should return any missing legal requirements for a Cat B test', () => {
      const result = testReportValidatorProvider.getMissingLegalRequirements({}, TestCategory.B);
      expect(result.length).toEqual(7);
      expect(result).toContain(legalRequirementsLabels.normalStart1);
      expect(result).toContain(legalRequirementsLabels.normalStart2);
      expect(result).toContain(legalRequirementsLabels.angledStart);
      expect(result).toContain(legalRequirementsLabels.hillStart);
      expect(result).toContain(legalRequirementsLabels.manoeuvre);
      expect(result).toContain(legalRequirementsLabels.vehicleChecks);
      expect(result).toContain(legalRequirementsLabels.eco);
    });
    it('should return an empty array if the legal requirements are met for a Cat BE test', () => {
      const result = testReportValidatorProvider.getMissingLegalRequirements(validTestCatBE, TestCategory.BE);
      expect(result.length).toEqual(0);
    });
    it('should return any missing legal requirements for a Cat BE test', () => {
      const result = testReportValidatorProvider.getMissingLegalRequirements({}, TestCategory.BE);
      expect(result.length).toEqual(6);
      expect(result).toContain(legalRequirementsLabels.normalStart1);
      expect(result).toContain(legalRequirementsLabels.uphillStart);
      expect(result).toContain(legalRequirementsLabels.angledStartControlledStop);
      expect(result).toContain(legalRequirementsLabels.manoeuvre);
      expect(result).toContain(legalRequirementsLabels.eco);
      expect(result).toContain(legalRequirementsLabels.uncoupleRecouple);
    });

    cCats.forEach((cat) => {
      it(`should return an empty array if the legal requirements are met for a Cat ${cat.category} test`, () => {
        const result = testReportValidatorProvider.getMissingLegalRequirements(cat.validTest, cat.category);
        expect(result.length).toEqual(0);
      });
      it(`should return any missing legal requirements for a Cat ${cat.category} test`, () => {
        const result = testReportValidatorProvider.getMissingLegalRequirements({}, cat.category);
        expect(result).toEqual(cat.legalReqs);
      });
    });

  });
  describe('isETAValid', () => {
    it('should return true if there is no ETA fault', () => {
      const result = testReportValidatorProvider.isETAValid({}, TestCategory.B);
      expect(result).toEqual(true);
    });
    it('should return true if there is a ETA and a Serious Fault', () => {
      const data: TestData = {
        ETA: {
          physical: true,
        },
        seriousFaults: {
          ancillaryControls: true,
        },
      };

      const result = testReportValidatorProvider.isETAValid(data, TestCategory.BE);
      expect(result).toEqual(true);
    });
    it('should return true if there is a ETA and a Dangerous Fault', () => {
      const data: TestData = {
        ETA: {
          verbal: true,
        },
        dangerousFaults: {
          ancillaryControls: true,
        },
      };

      const result = testReportValidatorProvider.isETAValid(data, TestCategory.B);
      expect(result).toEqual(true);
    });
    it('should return true if there is a Serious Fault and no ETA', () => {
      const data: TestData = {
        seriousFaults: {
          clearance: true,
        },
      };

      const result = testReportValidatorProvider.isETAValid(data, TestCategory.BE);
      expect(result).toEqual(true);
    });
    it('should return true if there is a Dangerous Fault and no ETA', () => {
      const data: TestData = {
        dangerousFaults: {
          controlsGears: true,
        },
      };

      const result = testReportValidatorProvider.isETAValid(data, TestCategory.B);
      expect(result).toEqual(true);
    });
    it('should return false if there is a ETA and no Serious or Dangerous Faults', () => {
      const data: TestData = {
        ETA: {
          verbal: true,
        },
      };

      const result = testReportValidatorProvider.isETAValid(data, TestCategory.BE);
      expect(result).toEqual(false);
    });
    cCats.forEach((cat) => {
      it(`should return true if there is a ETA and a Serious Fault for Cat ${cat.category}`, () => {
        const data: TestData = {
          ETA: {
            physical: true,
          },
          seriousFaults: {
            ancillaryControls: true,
          },
        };

        const result = testReportValidatorProvider.isETAValid(data, cat.category);
        expect(result).toEqual(true);
      });
      it(`should return true if there is a Serious Fault and no ETA for Cat ${cat.category}`, () => {
        const data: TestData = {
          seriousFaults: {
            clearance: true,
          },
        };

        const result = testReportValidatorProvider.isETAValid(data, cat.category);
        expect(result).toEqual(true);
      });
      it(`should return false if there is a ETA and no Serious or Dangerous Faults for Cat ${cat.category}`, () => {
        const data: TestData = {
          ETA: {
            verbal: true,
          },
        };

        const result = testReportValidatorProvider.isETAValid(data, cat.category);
        expect(result).toEqual(false);
      });
    });
  });

  describe('validateSpeedChecksCatAMod1', () => {
    it('should return SpeedCheckState.NOT_MET when emergency stop speed not met is true', () => {
      const testData = {
        emergencyStop: {
          speedNotMetSeriousFault: true,
        },
      };

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.NOT_MET);
    });

    it('should return SpeedCheckState.NOT_MET when avoidance speed not met is true', () => {
      const testData = {
        avoidance: {
          speedNotMetSeriousFault: true,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.NOT_MET);
    });

    it('should return SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT', () => {
      const testData = {
        emergencyStop: {
          outcome: CompetencyOutcome.S,
          speedNotMetSeriousFault: false,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT);
    });

    it('should return SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT', () => {
      const testData = {
        emergencyStop: {
          outcome: CompetencyOutcome.D,
          speedNotMetSeriousFault: false,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT);
    });

    it('should return SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING', () => {
      const testData = {
        emergencyStop: {
          firstAttempt: undefined,
        },
        avoidance: {
          firstAttempt: undefined,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING);
    });

    it('should return SpeedCheckState.EMERGENCY_STOP_MISSING', () => {
      const testData = {
        emergencyStop: {
          firstAttempt: undefined,
        },
        avoidance: {
          firstAttempt: 48,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_MISSING);
    });

    it('should return SpeedCheckState.AVOIDANCE_MISSING', () => {
      const testData = {
        emergencyStop: {
          firstAttempt: 48,
        },
        avoidance: {
          firstAttempt: undefined,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.AVOIDANCE_MISSING);
    });

    it('should return SpeedCheckState.VALID', () => {
      const testData = {
        emergencyStop: {
          firstAttempt: 48,
        },
        avoidance: {
          firstAttempt: 49,
        },
      } as CatAMod1TestData;

      const result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);

      expect(result).toBe(SpeedCheckState.VALID);
    });
  });

});
