import { TestBed } from '@angular/core/testing';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { configureTestSuite } from 'ng-bullet';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { TestResultProvider } from '../../test-result/test-result';
import { ActivityCodeFinalisationProvider } from '../activity-code-finalisation';
// import { TestResultProviderMock } from '../../test-result/__mocks__/test-result.mock';

fdescribe('Activity code finalisation Provider', () => {

  let testResultProvider: TestResultProvider;
  let activityCodeFinalisationProvider: ActivityCodeFinalisationProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        // { provide: TestResultProvider, useClass: TestResultProviderMock },
        TestResultProvider,
        FaultCountProvider,
        ActivityCodeFinalisationProvider,
      ],
    });
  });

  beforeEach(() => {
    testResultProvider = TestBed.get(TestResultProvider);
    activityCodeFinalisationProvider = TestBed.get(ActivityCodeFinalisationProvider);
    spyOn(testResultProvider, 'calculateTestResult');
  });

  describe('Check if test data for different categories are invalid', () => {

    it('should call testResultProvider with the correct category for B', () => {
      activityCodeFinalisationProvider.catBTestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.B, {});
    });

    it('should call testResultProvider with the correct category for C', () => {
      activityCodeFinalisationProvider.catCTestDataIsInvalid(ActivityCodes.FAIL_CANDIDATE_STOPS_TEST, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.C, {});
    });

    it('should call testResultProvider with the correct category for AM1', () => {
      activityCodeFinalisationProvider.catAMod1TestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.EUAM1, {});
    });

    it('should call testResultProvider with the correct category for AM2', () => {
      activityCodeFinalisationProvider.catAMod2TestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.EUAM2, {});
    });

    it('should call testResultProvider with the correct category for ADI2', () => {
      activityCodeFinalisationProvider.catADIPart2TestDataIsInvalid(ActivityCodes.FAIL_CANDIDATE_STOPS_TEST, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.ADI2, {});
    });

    it('should call testResultProvider with the correct category for BE', () => {
      activityCodeFinalisationProvider.catBETestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.BE, {});
    });

    it('should call testResultProvider with the correct category for Home', () => {
      activityCodeFinalisationProvider.catHomeTestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
      expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith(TestCategory.F, {});
    });
  });

});
