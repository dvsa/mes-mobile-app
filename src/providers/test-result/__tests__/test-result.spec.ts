import { TestBed } from '@angular/core/testing';
import { TestResultProvider } from '../test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { DrivingFaults } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { FaultCountProvider } from '../../fault-count/fault-count';

// TODO: This test has tight coupling with category B
// We will need to adjust it when we introduce new categories
describe('TestResultCalculatorProvider', () => {

  let testResultProvider: TestResultProvider;

  const initialTestData: CatBUniqueTypes.TestData = {
    dangerousFaults: {},
    drivingFaults: {},
    manoeuvres: {},
    seriousFaults: {},
    testRequirements: {},
    ETA: {},
    eco: {},
    controlledStop: {},
    vehicleChecks: {
      tellMeQuestion: {
        code: 'T3',
        description: 'Tell me question',
        outcome: 'P',
      },
      showMeQuestion: {
        outcome: 'P',
      },
    },
  };

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

  describe('calculateCatBTestResult', () => {
    it('should return a Fail when a dangerous fault exists', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Fail when a serious fault exists', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        seriousFaults: {
          positioningNormalDriving: true,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Fail when there are 16 driving faults', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        drivingFaults: {
          ...drivingFaults,
          judgementMeeting: 1,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });

    it('should return a Fail when there are 16 driving faults and a dangerous fault', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
        drivingFaults: {
          ...drivingFaults,
          judgementMeeting: 1,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Fail when there are 16 driving faults and a serious fault', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        seriousFaults: {
          positioningNormalDriving: true,
        },
        drivingFaults: {
          ...drivingFaults,
          judgementMeeting: 1,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Fail when there are 15 driving faults and a dangerous fault', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        drivingFaults,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });
    it('should return a Fail when there are 15 driving faults and a serious fault', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        drivingFaults,
        seriousFaults: {
          positioningNormalDriving: true,
        },
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.FAIL);
        done();
      });
    });

    it('should return a Pass when there are 15 driving faults', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
        drivingFaults,
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.PASS);
        done();
      });
    });
    it('should return a Pass when there are no driving faults', (done) => {
      // ARRANGE
      const testData: CatBUniqueTypes.TestData = {
        ...initialTestData,
      };
      // ASSERT
      testResultProvider.calculateCatBTestResult(testData).subscribe((result) => {
        expect(result).toBe(ActivityCodes.PASS);
        done();
      });
    });
  });
});
