import { getCurrentTest } from '../tests.selector';
import { JournalModel } from '../../../pages/journal/journal.model';
import { AppInfoModel } from '../../app-info/app-info.model';
import { LogsModel } from '../../logs/logs.model';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import {
  initialState as preTestDeclarationsInitialState,
} from '../pre-test-declarations/pre-test-declarations.reducer';

describe('testsSelector', () => {
  describe('getCurrentTest', () => {
    it('should return whichever test is the current one', () => {
      const currentTest: StandardCarTestCATBSchema = {
        category: 'B',
        id: 'abc123',
        candidate: {},
        testData: {},
        preTestDeclarations: preTestDeclarationsInitialState,
      };
      const journal: JournalModel = { isLoading: false, lastRefreshed: new Date(), slots: {}, selectedDate: 'dummy' };
      const appInfo: AppInfoModel = { versionNumber: '0.0.0' };
      const logs: LogsModel = [];
      const state = {
        journal,
        appInfo,
        logs,
        tests: { startedTests: { 123: currentTest }, currentTest: { slotId: '123' },
        },
      };

      const result = getCurrentTest(state);

      expect(result).toBe(currentTest);
    });
  });
});
