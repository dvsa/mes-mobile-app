import { TestBed } from '@angular/core/testing';
import { TestResultProvider } from '../test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { DrivingFaults } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

describe('TestResultCalculatorProvider', () => {

  let testResultProvider: TestResultProvider;

  const drivingFaults: DrivingFaults = {
    useOfMirrorsSignalling: 1,
    useOfMirrorsChangeDirection: 1,
    useOfMirrorsChangeSpeed: 1,
    signalsNecessary: 1,
    signalsCorrectly: 1,
    signalsTimed: 1,
    junctionsApproachSpeed: 1,
    junctionsObservation: 1,
    junctionsTurningRight: 1,
    junctionsTurningLeft: 1,
    junctionsCuttingCorners: 1,
    controlsAccelerator: 1,
    controlsClutch: 1,
    judgementOvertaking: 1,
    progressAppropriateSpeed: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestResultProvider,
        FaultCountProvider,
      ],
    });

    testResultProvider = TestBed.get(TestResultProvider);
  });

  describe('calculateTestResult', () => {
    describe('Category B', () => {
      it('should return a Fail when a dangerous fault exists', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          dangerousFaults: {
            positioningNormalDriving: true,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when a serious fault exists', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          seriousFaults: {
            positioningNormalDriving: true,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 16 driving faults', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          drivingFaults: {
            ...drivingFaults,
            judgementMeeting: 1,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 16 driving faults and a dangerous fault', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          dangerousFaults: {
            positioningNormalDriving: true,
          },
          drivingFaults: {
            ...drivingFaults,
            judgementMeeting: 1,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 16 driving faults and a serious fault', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          seriousFaults: {
            positioningNormalDriving: true,
          },
          drivingFaults: {
            ...drivingFaults,
            judgementMeeting: 1,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 15 driving faults and a dangerous fault', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          drivingFaults,
          dangerousFaults: {
            positioningNormalDriving: true,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 15 driving faults and a serious fault', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          drivingFaults,
          seriousFaults: {
            positioningNormalDriving: true,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Pass when there are 15 driving faults', (done) => {
        const testData: CatBUniqueTypes.TestData = {
          drivingFaults,
        };
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.PASS);
          done();
        });
      });
      it('should return a Pass when there are no driving faults', (done) => {
        const testData: CatBUniqueTypes.TestData = {};
        testResultProvider.calculateTestResult(TestCategory.B, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.PASS);
          done();
        });
      });
    });

    describe('Category B+E', () => {
      it('should return a Fail when a dangerous fault exists', (done) => {
        const testData: CatBEUniqueTypes.TestData = {
          dangerousFaults: {
            positioningNormalDriving: true,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when a serious fault exists', (done) => {
        const testData: CatBEUniqueTypes.TestData = {
          seriousFaults: {
            positioningNormalDriving: true,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 16 driving faults', (done) => {
        const testData: CatBEUniqueTypes.TestData = {
          drivingFaults: {
            ...drivingFaults,
            judgementMeeting: 1,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 16 driving faults and a dangerous fault', (done) => {
        const testData: CatBEUniqueTypes.TestData = {
          dangerousFaults: {
            positioningNormalDriving: true,
          },
          drivingFaults: {
            ...drivingFaults,
            judgementMeeting: 1,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
      it('should return a Fail when there are 16 driving faults and a serious fault', (done) => {
        const testData: CatBEUniqueTypes.TestData = {
          seriousFaults: {
            positioningNormalDriving: true,
          },
          drivingFaults: {
            ...drivingFaults,
            judgementMeeting: 1,
          },
        };
        testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
          expect(result).toBe(ActivityCodes.FAIL);
          done();
        });
      });
    });
    it('should return a Fail when there are 15 driving faults and a dangerous fault', (done) => {
      const testData: CatBEUniqueTypes.TestData = {
        drivingFaults,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
      };
      testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Fail when there are 15 driving faults and a serious fault', (done) => {
      const testData: CatBEUniqueTypes.TestData = {
        drivingFaults,
        seriousFaults: {
          positioningNormalDriving: true,
        },
      };
      testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Pass when there are 15 driving faults', (done) => {
      const testData: CatBEUniqueTypes.TestData = {
        drivingFaults,
      };
      testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.PASS);
        done();
      });
    });
    it('should return a Pass when there are no driving faults', (done) => {
      const testData: CatBEUniqueTypes.TestData = {};
      testResultProvider.calculateTestResult(TestCategory.BE, testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.PASS);
        done();
      });
    });
  });
});
