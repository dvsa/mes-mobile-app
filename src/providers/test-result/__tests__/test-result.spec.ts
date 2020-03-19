import { TestBed } from '@angular/core/testing';
import { TestResultProvider } from '../test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import * as mocks from '../__mocks__/test-result-data.mock';

describe('TestResultCalculatorProvider', () => {

  const categories: TestCategory[] = [
    TestCategory.B,
    TestCategory.BE,
    TestCategory.C,
    TestCategory.C1,
    TestCategory.C1E,
    TestCategory.CE,
    TestCategory.D,
    TestCategory.D1,
    TestCategory.DE,
    TestCategory.D1E,
    TestCategory.F,
    TestCategory.G,
    TestCategory.H,
    TestCategory.K,
  ];

  const adiCategories: TestCategory[] = [
    TestCategory.ADI2,
  ];

  const allCategories: TestCategory[] = [
    ...categories,
    ...adiCategories,
  ];

  let testResultProvider: TestResultProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        TestResultProvider,
        FaultCountProvider,
      ],
    });
  });

  beforeEach(() => {
    testResultProvider = TestBed.get(TestResultProvider);
  });

  describe('calculateTestResult', () => {
    describe(`${allCategories.join(', ')}`, () => {
      allCategories.forEach((cat) => {
        it(`should return a Pass when there are no driving faults for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.noFaultsMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.PASS);
            done();
          });
        });
        it(`should return a Fail when a dangerous fault exists for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.dangerousFaultMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when a serious fault exists for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.seriousFaultMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
      });
    });

    describe('ADI2', () => {
      adiCategories.forEach((cat) => {
        it(`should return a Fail when there are 7 driving faults for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sevenDrivingFaultsMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 7 driving faults and a dangerous for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sevenDrivingFaultsWithDangerousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 7 driving faults and a serious fault for a Cat ${cat} test`,
        (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sevenDrivingFaultsWithSeriousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 6 driving faults and a dangerous for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sixDrivingFaultsWithDangerousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 6 driving faults and a serious fault for a Cat ${cat} test`,
        (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sixDrivingFaultsWithSeriousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Pass when there are 6 driving faults for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sixDrivingFaultsMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.PASS);
            done();
          });
        });
      });
    });

    describe(`${categories.join(', ')}`, () => {
      categories.forEach((cat) => {
        it(`should return a Fail when there are 16 driving faults for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sixteenDrivingFaultsMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 16 driving faults and a dangerous for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sixteenDrivingFaultsWithDangerousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 16 driving faults and a serious fault for a Cat ${cat} test`,
        (done) => {
          testResultProvider.calculateTestResult(cat, mocks.sixteenDrivingFaultsWithSeriousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 15 driving faults and a dangerous for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.fifteenDrivingFaultsWithDangerousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Fail when there are 15 driving faults and a serious fault for a Cat ${cat} test`,
        (done) => {
          testResultProvider.calculateTestResult(cat, mocks.fifteenDrivingFaultsWithSeriousMock)
          .subscribe((result) => {
            expect(result).toBe(ActivityCodes.FAIL);
            done();
          });
        });
        it(`should return a Pass when there are 15 driving faults for a Cat ${cat} test`, (done) => {
          testResultProvider.calculateTestResult(cat, mocks.fifteenDrivingFaultsMock).subscribe((result) => {
            expect(result).toBe(ActivityCodes.PASS);
            done();
          });
        });
      });
    });
  });
});
