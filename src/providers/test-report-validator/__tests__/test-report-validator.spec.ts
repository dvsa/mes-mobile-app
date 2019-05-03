import { TestBed } from '@angular/core/testing';
import { TestReportValidatorProvider } from '../test-report-validator';
import { CatBLegalRequirements } from '../../../modules/tests/test-data/test-data.models';

describe('TestReportValidator', () => {

  let testReportValidatorProvider: TestReportValidatorProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestReportValidatorProvider,
      ],
    });

    testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
  });

  describe('validateCatBTestReport', () => {
    it('should return true for a valid test', () => {
      const testResult: CatBLegalRequirements = {
        normalStart1: true,
        normalStart2: true,
        angledStart: true,
        hillStart: true,
        eco: true,
        manoeuvre: true,
        vehicleChecks: true,
      };

      expect(testReportValidatorProvider.validateCatBTestReport(testResult)).toBeTruthy();
    });
    it('should return false for a invalid test', () => {
      const testResult: CatBLegalRequirements = {
        normalStart1: false,
        normalStart2: true,
        angledStart: true,
        hillStart: false,
        eco: true,
        manoeuvre: true,
        vehicleChecks: true,
      };

      expect(testReportValidatorProvider.validateCatBTestReport(testResult)).toBeFalsy();
    });
  });
});
