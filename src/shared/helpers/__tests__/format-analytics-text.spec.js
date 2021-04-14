var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as fakeJournalActions from '../../../pages/fake-journal/fake-journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { formatAnalyticsText } from '../format-analytics-text';
import { AnalyticsEventCategories } from '../../../providers/analytics/analytics.model';
describe('formatAnalyticsText', function () {
    var initialState = {
        currentTest: { slotId: null },
        startedTests: {},
        testStatus: {},
    };
    var eventString = 'analytics event';
    var slotId = 123;
    it('should prefix end to end practice tests with the correct text', function () {
        var state = __assign({}, initialState);
        var action = new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId);
        var tests = testsReducer(state, action);
        var result = formatAnalyticsText(eventString, tests);
        expect(result).toBe(AnalyticsEventCategories.PRACTICE_MODE + " - " + eventString);
    });
    it('should prefix practice tests with the correct text', function () {
        var state = __assign({}, initialState);
        var action = new testsActions.StartTestReportPracticeTest(testReportPracticeSlotId);
        var tests = testsReducer(state, action);
        var result = formatAnalyticsText(eventString, tests);
        expect(result).toBe(AnalyticsEventCategories.PRACTICE_TEST + " - " + eventString);
    });
    it('should prefix rekey tests with the correct text', function () {
        var state = __assign({}, initialState);
        var action = new testsActions.StartTest(12345, "B" /* B */);
        var tests = testsReducer(state, action);
        tests.startedTests[tests.currentTest.slotId].rekey = true;
        var result = formatAnalyticsText(eventString, tests);
        expect(result).toBe(AnalyticsEventCategories.REKEY + " - " + eventString);
    });
    it('should not prefix regular tests with any additional text', function () {
        var state = __assign({}, initialState);
        var action = new testsActions.StartTest(slotId, "B" /* B */);
        var tests = testsReducer(state, action);
        var result = formatAnalyticsText(eventString, tests);
        expect(result).toBe(eventString);
    });
    it('should prefix delegated tests with the correct text', function () {
        var _a;
        var state = __assign({}, initialState);
        var action = new testsActions.StartTest(slotId, "B+E" /* BE */, false, true);
        var tests = testsReducer(state, action);
        var localTests = __assign(__assign({}, tests), { startedTests: __assign(__assign({}, tests.startedTests), (_a = {}, _a[slotId] = __assign(__assign({}, tests.startedTests[slotId]), { category: 'B+E', delegatedTest: true }), _a)) });
        var result = formatAnalyticsText(eventString, localTests);
        expect(result).toBe(AnalyticsEventCategories.DELEGATED_TEST + " - " + eventString);
    });
    it('should prefix delegated tests with the DelExRk even though test is rekey', function () {
        var _a;
        var state = __assign({}, initialState);
        var action = new testsActions.StartTest(slotId, "B+E" /* BE */, true, true);
        var tests = testsReducer(state, action);
        var localTests = __assign(__assign({}, tests), { startedTests: __assign(__assign({}, tests.startedTests), (_a = {}, _a[slotId] = __assign(__assign({}, tests.startedTests[slotId]), { category: 'B+E', delegatedTest: true, rekey: true }), _a)) });
        var result = formatAnalyticsText(eventString, localTests);
        expect(result).toBe(AnalyticsEventCategories.DELEGATED_TEST + " - " + eventString);
    });
});
//# sourceMappingURL=format-analytics-text.spec.js.map