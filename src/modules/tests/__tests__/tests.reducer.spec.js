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
import { testsReducer } from '../tests.reducer';
import * as candidateReducer from '../journal-data/common/candidate/candidate.reducer';
import * as preTestDeclarationsReducer from '../pre-test-declarations/common/pre-test-declarations.reducer';
import * as testsActions from './../tests.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { testReportPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
describe('testsReducer', function () {
    var newCandidate = { candidate: { candidateId: 456 } };
    var preTestDeclarations = preTestDeclarationsReducer.initialState;
    beforeEach(function () {
        spyOn(candidateReducer, 'candidateReducer').and.returnValue(newCandidate);
        spyOn(preTestDeclarationsReducer, 'preTestDeclarationsReducer').and.returnValue(preTestDeclarations);
    });
    it('use the payload of a test started action to setup state for a new test', function () {
        var state = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: {},
            completedTests: [],
        };
        var slotId = 123;
        var action = new testsActions.StartTest(slotId, "B" /* B */);
        var output = testsReducer(state, action);
        expect(output.currentTest.slotId).toBe('123');
    });
    it('should use the payload of a start test report practice test action to setup state for a new test', function () {
        var state = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: {},
            completedTests: [],
        };
        var slotId = testReportPracticeSlotId;
        var action = new testsActions.StartTestReportPracticeTest(slotId);
        var output = testsReducer(state, action);
        expect(output.currentTest.slotId).toBe(testReportPracticeSlotId);
    });
    it('should reset the state when a test report practice test is started and not affect other tests', function () {
        var _a;
        var state = {
            currentTest: { slotId: testReportPracticeSlotId },
            startedTests: (_a = {
                    1: {
                        testData: {
                            dangerousFaults: {},
                            drivingFaults: {
                                clearance: 1,
                            },
                            eyesightTest: {},
                            manoeuvres: {},
                            seriousFaults: {
                                signalsTimed: true,
                            },
                            testRequirements: {},
                            ETA: {},
                            eco: {},
                            controlledStop: {},
                            vehicleChecks: {
                                tellMeQuestion: {
                                    outcome: 'DF',
                                },
                                showMeQuestion: {
                                    outcome: 'S',
                                },
                            },
                        },
                        version: '0.0.1',
                        category: null,
                        journalData: null,
                        activityCode: null,
                        rekey: false,
                        changeMarker: false,
                        examinerBooked: 1,
                        examinerConducted: 1,
                        examinerKeyed: 1,
                    }
                },
                _a[testReportPracticeSlotId] = {
                    testData: {
                        dangerousFaults: {},
                        drivingFaults: {
                            moveOffSafety: 1,
                        },
                        manoeuvres: {},
                        seriousFaults: {
                            positioningNormalDriving: true,
                        },
                        testRequirements: {},
                        ETA: {},
                        eco: {},
                        controlledStop: {},
                        vehicleChecks: {
                            tellMeQuestion: {
                                outcome: 'DF',
                            },
                            showMeQuestion: {},
                        },
                    },
                    version: '0.0.1',
                    category: null,
                    journalData: null,
                    activityCode: null,
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                _a),
            testStatus: {},
        };
        var slotId = testReportPracticeSlotId;
        var action = new testsActions.StartTestReportPracticeTest(slotId);
        var output = testsReducer(state, __assign(__assign({}, action), { category: "B" /* B */ }));
        output.startedTests[testReportPracticeSlotId].testData;
        expect(output.startedTests[testReportPracticeSlotId].testData
            .seriousFaults.positioningNormalDriving)
            .toBeUndefined();
        expect(output.startedTests[testReportPracticeSlotId].testData
            .drivingFaults.moveOffSafety)
            .toBeUndefined();
        expect(output.startedTests[testReportPracticeSlotId].testData
            .vehicleChecks.tellMeQuestion.outcome)
            .toBeUndefined();
        expect(output.startedTests[1].testData.seriousFaults.signalsTimed).toEqual(true);
        expect(output.startedTests[1].testData.drivingFaults.clearance).toEqual(1);
        expect(output.startedTests[1].testData.vehicleChecks.tellMeQuestion.outcome)
            .toEqual(CompetencyOutcome.DF);
        expect(output.startedTests[1].testData.vehicleChecks.showMeQuestion.outcome)
            .toEqual(CompetencyOutcome.S);
    });
    it('should ensure that all slot ids for test report practice tests are test_report_practice ', function () {
        var state = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: {},
            completedTests: [],
        };
        var slotId = '123';
        var action = new testsActions.StartTestReportPracticeTest(slotId);
        var output = testsReducer(state, action);
        expect(output.currentTest.slotId).toBe(testReportPracticeSlotId);
    });
    it('should derive the sub-states from sub-reducers', function () {
        var state = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: {},
        };
        var result = testsReducer(state, new testsActions.StartTest(123, "B" /* B */));
        expect(candidateReducer.candidateReducer).toHaveBeenCalled();
        expect(preTestDeclarationsReducer.preTestDeclarationsReducer).toHaveBeenCalled();
        expect(result.startedTests['123'].journalData.candidate).toBe(newCandidate);
        expect(result.startedTests['123'].preTestDeclarations).toBe(preTestDeclarations);
    });
    it('should assign the slot ID as the current test when a test is activated', function () {
        var state = {
            currentTest: { slotId: '123' },
            startedTests: {},
            testStatus: {},
        };
        var result = testsReducer(state, new testsActions.ActivateTest(456, "B" /* B */));
        expect(result.currentTest.slotId).toBe('456');
    });
});
//# sourceMappingURL=tests.reducer.spec.js.map