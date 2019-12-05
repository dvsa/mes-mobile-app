import { TestBed } from '@angular/core/testing';
import { TestReportValidatorProvider } from '../test-report-validator';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { validTestCatBE, validTestCatB } from '../__mocks__/test-result.mock';
import { legalRequirementsLabels } from '../../../shared/constants/legal-requirements/legal-requirements.constants';
import { TestData } from '@dvsa/mes-test-schema/categories/Common';

describe('TestReportValidator', () => {

  let testReportValidatorProvider: TestReportValidatorProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestReportValidatorProvider,
        FaultCountProvider,
      ],
    });

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
  });

});
