import { getCurrentTest, getTestStatus, getTestOutcomeClass, isPassed, getTestOutcomeText } from '../tests.selector';
import { JournalModel } from '../../../pages/journal/journal.model';
import { AppInfoModel } from '../../app-info/app-info.model';
import { LogsModel } from '../../logs/logs.model';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from '../tests.reducer';
import { TestStatus } from '../test-status/test-status.model';
import { DateTime } from '../../../shared/helpers/date-time';

describe('testsSelector', () => {
  describe('getCurrentTest', () => {
    it('should return whichever test is the current one', () => {
      const currentTest: StandardCarTestCATBSchema = {
        category: 'B',
        id: 'abc123',
        journalData: {
          testSlotAttributes: {
            welshTest: false,
            slotId: 123,
            start: '11:34',
            vehicleSlotType: 'B57mins',
            extendedTest: false,
            specialNeeds: false,
          },
          examiner: {
            staffNumber: '',
          },
          testCentre: {
            costCode: '',
          },
          candidate: {},
          applicationReference: {
            applicationId: 999,
            bookingSequence: 3,
            checkDigit: 5,
          },
        },
        activityCode: 'x',
      };
      const journal: JournalModel = { isLoading: false, lastRefreshed: new Date(), slots: {}, selectedDate: 'dummy' };
      const appInfo: AppInfoModel = { versionNumber: '0.0.0' };
      const logs: LogsModel = [];
      const state = {
        journal,
        appInfo,
        logs,
        tests: { startedTests: { 123: currentTest }, currentTest: { slotId: '123' }, testLifecycles: {} },
      };

      const result = getCurrentTest(state.tests);

      expect(result).toBe(currentTest);
    });
  });

  describe('getTestStatus', () => {
    it('should retrieve the status of the test with the given slotId', () => {
      const testState: TestsModel = {
        currentTest: { slotId: null },
        startedTests: {},
        testLifecycles: { 12345: TestStatus.Decided },
      };

      const result = getTestStatus(testState, 12345);

      expect(result).toBe(TestStatus.Decided);
    });

    it('should default to booked if the test with the given slot ID does not have a status yet', () => {
      const testState: TestsModel = {
        currentTest: { slotId: null },
        startedTests: {},
        testLifecycles: {},
      };

      const result = getTestStatus(testState, 12345);

      expect(result).toBe(TestStatus.Booked);
    });
  });

  describe('getTestOutcomeText', () => {
    const testState: StandardCarTestCATBSchema = {
      id: '1',
      activityCode: '1',
      category: 'x',
      journalData: {
        examiner: { staffNumber: '12345' },
        testCentre: { costCode: '12345' },
        testSlotAttributes: {
          slotId: 12345,
          vehicleSlotType: 'B57mins',
          start: new DateTime().format('HH:mm'),
          welshTest: false,
          extendedTest: false,
          specialNeeds: false,
        },
        candidate: {},
        applicationReference: {
          applicationId: 123,
          bookingSequence: 1,
          checkDigit: 2,
        },
      },

    };
    it('should retrieve a passed result for activity code 1', () => {
      const result = getTestOutcomeText(testState);
      expect(result).toBe('Passed');
    });
    it('should retrieve an unsuccessful result for activity code 2', () => {
      testState.activityCode = '2';
      const result = getTestOutcomeText(testState);
      expect(result).toBe('Unsuccessful');
    });
    it('should retrieve a terminated result for non listed activity code 86', () => {
      testState.activityCode = '86';
      const result = getTestOutcomeText(testState);
      expect(result).toBe('Terminated');
    });
  });

  describe('getTestOutcomeClass', () => {
    const testState: StandardCarTestCATBSchema = {
      id: '1',
      activityCode: '1',
      category: 'x',
      journalData: {
        examiner: { staffNumber: '12345' },
        testCentre: { costCode: '12345' },
        testSlotAttributes: {
          slotId: 12345,
          vehicleSlotType: 'B57mins',
          start: new DateTime().format('HH:mm'),
          welshTest: false,
          extendedTest: false,
          specialNeeds: false,
        },
        candidate: {},
        applicationReference: {
          applicationId: 123,
          bookingSequence: 1,
          checkDigit: 2,
        },
      },

    };
    it('should return mes-green class for activity code 1', () => {
      const result = getTestOutcomeClass(testState);
      expect(result).toBe('mes-green');
    });
    it('should return mes-red class for activity code 2', () => {
      testState.activityCode = '2';
      const result = getTestOutcomeClass(testState);
      expect(result).toBe('mes-red');
    });
    it('should return mes-red class for non listed activity code 86', () => {
      testState.activityCode = '86';
      const result = getTestOutcomeClass(testState);
      expect(result).toBe('mes-red');
    });
  });

  describe('isPassed', () => {
    const testState: StandardCarTestCATBSchema = {
      id: '1',
      activityCode: '1',
      category: 'x',
      journalData: {
        examiner: { staffNumber: '12345' },
        testCentre: { costCode: '12345' },
        testSlotAttributes: {
          slotId: 12345,
          vehicleSlotType: 'B57mins',
          start: new DateTime().format('HH:mm'),
          welshTest: false,
          extendedTest: false,
          specialNeeds: false,
        },
        candidate: {},
        applicationReference: {
          applicationId: 123,
          bookingSequence: 1,
          checkDigit: 2,
        },
      },

    };
    it('should return true for activity code 1', () => {
      const result = isPassed(testState);
      expect(result).toBeTruthy();
    });
    it('should return false for activity code 2', () => {
      testState.activityCode = '2';
      const result = isPassed(testState);
      expect(result).toBeFalsy();
    });
    it('should return false for non listed activity code 86', () => {
      testState.activityCode = '86';
      const result = isPassed(testState);
      expect(result).toBeFalsy();
    });
  });

});
