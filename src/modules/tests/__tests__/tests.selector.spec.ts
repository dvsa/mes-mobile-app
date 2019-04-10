import { getCurrentTest, getTestStatus } from '../tests.selector';
import { JournalModel } from '../../../pages/journal/journal.model';
import { AppInfoModel } from '../../app-info/app-info.model';
import { LogsModel } from '../../logs/logs.model';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from '../tests.reducer';
import { TestStatus } from '../test-status/test-status.model';

describe('testsSelector', () => {
  describe('getCurrentTest', () => {
    it('should return whichever test is the current one', () => {
      const currentTest: StandardCarTestCATBSchema = {
        category: 'B',
        id: 'abc123',
        slotId: 123,
        welshTest: false,
        activityCode: 'x',
        candidate: {},
        applicationReference: {
          applicationId: 999,
          bookingSequence: 3,
          checkDigit: 5,
        },
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
});
