import { TestBed } from '@angular/core/testing';
import { TestResultProvider } from '../test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { TestData, DrivingFaults } from '@dvsa/mes-test-schema/categories/B';

describe('TestResultCalculatorProvider', () => {

  let testResultProvider: TestResultProvider;

  const initialTestData: TestData = {
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
      ],
    });

    testResultProvider = TestBed.get(TestResultProvider);
  });

  describe('calculateCatBTestResult', () => {
    it('should return a Fail when a dangerous fault exists', () => {
      const testData: TestData = {
        ...initialTestData,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });
    it('should return a Fail when a serious fault exists', () => {
      const testData: TestData = {
        ...initialTestData,
        seriousFaults: {
          positioningNormalDriving: true,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });
    it('should return a Fail when there are 16 driving faults', () => {
      const testData: TestData = {
        ...initialTestData,
        drivingFaults: {
          ...drivingFaults,
          judgementMeeting: 1,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });

    it('should return a Fail when there are 16 driving faults and a dangerous fault', () => {
      const testData: TestData = {
        ...initialTestData,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
        drivingFaults: {
          ...drivingFaults,
          judgementMeeting: 1,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });
    it('should return a Fail when there are 16 driving faults and a serious fault', () => {
      const testData: TestData = {
        ...initialTestData,
        seriousFaults: {
          positioningNormalDriving: true,
        },
        drivingFaults: {
          ...drivingFaults,
          judgementMeeting: 1,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });
    it('should return a Fail when there are 15 driving faults and a dangerous fault', () => {
      const testData: TestData = {
        ...initialTestData,
        drivingFaults,
        dangerousFaults: {
          positioningNormalDriving: true,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });
    it('should return a Fail when there are 15 driving faults and a serious fault', () => {
      const testData: TestData = {
        ...initialTestData,
        drivingFaults,
        seriousFaults: {
          positioningNormalDriving: true,
        },
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.FAIL);
    });

    it('should return a Pass when there are 15 driving faults', () => {
      const testData: TestData = {
        ...initialTestData,
        drivingFaults,
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.PASS);
    });
    it('should return a Pass when there are no driving faults', () => {
      const testData: TestData = {
        ...initialTestData,
      };
      expect(testResultProvider.calculateCatBTestResult(testData)).toBe(ActivityCodes.PASS);
    });
  });
});
