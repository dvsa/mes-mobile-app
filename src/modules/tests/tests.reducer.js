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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as testsActions from './tests.actions';
import { createFeatureSelector } from '@ngrx/store';
import { testStatusReducer } from './test-status/test-status.reducer';
import * as fakeJournalActions from '../../pages/fake-journal/fake-journal.actions';
import { testReportPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { get } from 'lodash';
import { testsReducerFactory } from './tests-reducer-factory';
export var initialState = {
    currentTest: { slotId: null },
    startedTests: {},
    testStatus: {},
};
/**
 * Handles actions relating to a particular test by finding which test the actions apply to
 * and applying a test capture domain concept reducer against that test's portion of the state.
 * @param state Test state for all tests
 * @param action The action to modify the state
 */
export function testsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    var slotId = deriveSlotId(state, action);
    var category = deriveCategory(state, action, slotId);
    switch (action.type) {
        case testsActions.LOAD_PERSISTED_TESTS_SUCCESS:
            return action.tests;
        case testsActions.START_TEST_REPORT_PRACTICE_TEST:
            return slotId ? createStateObject(removeTest(state, slotId), action, slotId, category) : state;
        case fakeJournalActions.START_E2E_PRACTICE_TEST:
            return slotId ? createStateObject(removeTest(state, slotId), action, slotId, category) : state;
        default:
            return slotId ? createStateObject(state, action, slotId, category) : state;
    }
}
var deriveSlotId = function (state, action) {
    if (action instanceof testsActions.StartTestReportPracticeTest) {
        return testReportPracticeSlotId;
    }
    if (action instanceof testsActions.StartTest
        || action instanceof testsActions.ActivateTest
        || action instanceof fakeJournalActions.StartE2EPracticeTest) {
        return "" + action.slotId;
    }
    return (state.currentTest && state.currentTest.slotId) ? state.currentTest.slotId : null;
};
var deriveCategory = function (state, action, slotId) {
    if (action instanceof testsActions.StartTest
        || action instanceof testsActions.ActivateTest
        || action instanceof testsActions.StartTestReportPracticeTest
        || action instanceof fakeJournalActions.StartE2EPracticeTest) {
        return action.category;
    }
    return get(state.startedTests[slotId], 'category', null);
};
var createStateObject = function (state, action, slotId, category) {
    var _a;
    return __assign(__assign({}, state), { startedTests: __assign(__assign({}, state.startedTests), (_a = {}, _a[slotId] = __assign({}, testsReducerFactory(category, action, state.startedTests[slotId])), _a)), currentTest: {
            slotId: slotId,
        }, testStatus: testStatusReducer(state.testStatus, action) });
};
var removeTest = function (state, slotId) {
    var _a = state.startedTests, _b = slotId, removedStartedTest = _a[_b], updatedStartedTests = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    var _c = state.testStatus, _d = slotId, removedTestStatus = _c[_d], updatedTestStatus = __rest(_c, [typeof _d === "symbol" ? _d : _d + ""]);
    return __assign(__assign({}, state), { currentTest: __assign({}, initialState.currentTest), startedTests: updatedStartedTests, testStatus: updatedTestStatus });
};
export var getTests = createFeatureSelector('tests');
//# sourceMappingURL=tests.reducer.js.map