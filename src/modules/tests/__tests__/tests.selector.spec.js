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
import { getCurrentTest, getTestStatus, isPassed, getTestOutcomeText, getActivityCode, isTestReportPracticeTest, isEndToEndPracticeTest, getActivityCodeBySlotId, getIncompleteTests, getIncompleteTestsCount, getOldestIncompleteTest, isDelegatedTest, hasStartedTests, } from '../tests.selector';
import { TestStatus } from '../test-status/test-status.model';
import { DateTime } from '../../../shared/helpers/date-time';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { ActivityCodeDescription, } from '../../../pages/office/components/activity-code/activity-code.constants';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { TestOutcome } from '../tests.constants';
describe('testsSelector', function () {
    describe('getCurrentTest', function () {
        it('should return whichever test is the current one', function () {
            var currentTest = {
                version: '0.0.1',
                category: 'B',
                journalData: {
                    testSlotAttributes: {
                        welshTest: false,
                        slotId: 123,
                        start: '11:34',
                        vehicleTypeCode: 'C',
                        extendedTest: false,
                        specialNeeds: false,
                    },
                    examiner: {
                        staffNumber: '',
                    },
                    testCentre: {
                        centreId: 1,
                        costCode: '',
                    },
                    candidate: {},
                    applicationReference: {
                        applicationId: 999,
                        bookingSequence: 3,
                        checkDigit: 5,
                    },
                },
                activityCode: ActivityCodes.PASS,
                rekey: false,
                changeMarker: false,
                examinerBooked: 1,
                examinerConducted: 1,
                examinerKeyed: 1,
            };
            var journal = {
                isLoading: false,
                lastRefreshed: new Date(),
                slots: {},
                selectedDate: 'dummy',
                examiner: { staffNumber: '123', individualId: 456 },
                completedTests: [],
            };
            var appInfo = { versionNumber: '0.0.0', employeeId: '1234567', employeeName: 'Fake Name' };
            var logs = [];
            var state = {
                journal: journal,
                appInfo: appInfo,
                logs: logs,
                tests: {
                    startedTests: { 123: currentTest },
                    currentTest: { slotId: '123' },
                    testStatus: {},
                    completedTests: [],
                },
            };
            var result = getCurrentTest(state.tests);
            expect(result).toBe(currentTest);
        });
    });
    describe('getTestStatus', function () {
        it('should retrieve the status of the test with the given slotId', function () {
            var testState = {
                currentTest: { slotId: null },
                startedTests: {},
                testStatus: { 12345: TestStatus.Decided },
            };
            var result = getTestStatus(testState, 12345);
            expect(result).toBe(TestStatus.Decided);
        });
        it('should default to booked if the test with the given slot ID does not have a status yet', function () {
            var testState = {
                currentTest: { slotId: null },
                startedTests: {},
                testStatus: {},
            };
            var result = getTestStatus(testState, 12345);
            expect(result).toBe(TestStatus.Booked);
        });
    });
    describe('getTestOutcomeText', function () {
        var testState = {
            activityCode: ActivityCodes.PASS,
            version: '0.0.1',
            category: 'x',
            journalData: {
                examiner: { staffNumber: '12345' },
                testCentre: { centreId: 1, costCode: '12345' },
                testSlotAttributes: {
                    slotId: 12345,
                    vehicleTypeCode: 'C',
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
            rekey: false,
            changeMarker: false,
            examinerBooked: 1,
            examinerConducted: 1,
            examinerKeyed: 1,
        };
        it('should retrieve a passed result for a pass activity code', function () {
            var result = getTestOutcomeText(testState);
            expect(result).toBe(TestOutcome.Passed);
        });
        it('should retrieve an unsuccessful result for a fail activity code', function () {
            testState.activityCode = ActivityCodes.FAIL;
            var result = getTestOutcomeText(testState);
            expect(result).toBe(TestOutcome.Failed);
        });
        it('should retrieve a terminated result for terminated activity code', function () {
            testState.activityCode = ActivityCodes.CANDIDATE_NOT_HAPPY_WITH_AUTHORISED_OCCUPANT;
            var result = getTestOutcomeText(testState);
            expect(result).toBe(TestOutcome.Terminated);
            expect(result).toBe('Terminated');
        });
    });
    describe('getTestOutcomeClass', function () {
        var testState = {
            activityCode: ActivityCodes.PASS,
            version: '0.0.1',
            category: 'x',
            journalData: {
                examiner: { staffNumber: '12345' },
                testCentre: { centreId: 1, costCode: '12345' },
                testSlotAttributes: {
                    slotId: 12345,
                    vehicleTypeCode: 'C',
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
            rekey: false,
            changeMarker: false,
            examinerBooked: 1,
            examinerConducted: 1,
            examinerKeyed: 1,
        };
        it('should return true for a passed activity code', function () {
            var result = isPassed(testState);
            expect(result).toEqual(true);
        });
        it('should return false for a failed activity code', function () {
            testState.activityCode = ActivityCodes.FAIL;
            var result = isPassed(testState);
            expect(result).toEqual(false);
        });
        it('should return false for a terminated activity code', function () {
            testState.activityCode = ActivityCodes.MECHANICAL_FAILURE;
            var result = isPassed(testState);
            expect(result).toEqual(false);
        });
    });
    describe('getActivityCode', function () {
        var testState = {
            // DVSA_RADIO_FAILURE = '25'
            activityCode: ActivityCodes.DVSA_RADIO_FAILURE,
            version: '0.0.1',
            category: 'x',
            journalData: {
                examiner: { staffNumber: '12345' },
                testCentre: { centreId: 1, costCode: '12345' },
                testSlotAttributes: {
                    slotId: 12345,
                    vehicleTypeCode: 'C',
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
            rekey: false,
            changeMarker: false,
            examinerBooked: 1,
            examinerConducted: 1,
            examinerKeyed: 1,
        };
        it('should return the DVSA_RADIO_FAILURE ActivityCode', function () {
            var activityCode = getActivityCode(testState);
            expect(activityCode.activityCode).toEqual(ActivityCodes.DVSA_RADIO_FAILURE);
            expect(activityCode.description).toEqual(ActivityCodeDescription.DVSA_RADIO_FAILURE);
        });
    });
    describe('isTestReportPracticeTest', function () {
        var testState = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: { 12345: TestStatus.Decided },
        };
        it('should return false when no tests started', function () {
            var result = isTestReportPracticeTest(testState);
            expect(result).toEqual(false);
        });
        it('should return false when slot id is numeric', function () {
            testState.currentTest.slotId = '1';
            var result = isTestReportPracticeTest(testState);
            expect(result).toEqual(false);
        });
        it('should return true when slot id starts with practice', function () {
            testState.currentTest.slotId = testReportPracticeSlotId;
            var result = isTestReportPracticeTest(testState);
            expect(result).toEqual(true);
        });
    });
    describe('isEndToEndPracticeTest', function () {
        var testState = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: { 12345: TestStatus.Decided },
        };
        it('should return false when no tests started', function () {
            var result = isEndToEndPracticeTest(testState);
            expect(result).toEqual(false);
        });
        it('should return false when slot id is numeric', function () {
            testState.currentTest.slotId = '1';
            var result = isEndToEndPracticeTest(testState);
            expect(result).toEqual(false);
        });
        it('should return true when slot id starts with practice', function () {
            testState.currentTest.slotId = end2endPracticeSlotId;
            var result = isEndToEndPracticeTest(testState);
            expect(result).toEqual(true);
        });
    });
    describe('getActivityCodeBySlotId', function () {
        it('should return a valid activity code if available', function () {
            var testState = {
                currentTest: { slotId: null },
                startedTests: {
                    1234: {
                        version: '0.0.1',
                        category: 'B',
                        activityCode: ActivityCodes.ACCIDENT,
                        journalData: null,
                        rekey: false,
                        changeMarker: false,
                        examinerBooked: 1,
                        examinerConducted: 1,
                        examinerKeyed: 1,
                    },
                },
                testStatus: {},
            };
            var result = getActivityCodeBySlotId(testState, 1234);
            expect(result).toEqual(ActivityCodes.ACCIDENT);
        });
        it('should return undefined if no activity code yet', function () {
            var testState = {
                currentTest: { slotId: null },
                startedTests: {
                    1234: null,
                },
                testStatus: {},
            };
            var result = getActivityCodeBySlotId(testState, 1234);
            expect(result).toBeNull();
        });
    });
    describe('unsubmitted tests', function () {
        var initialState = {
            currentTest: { slotId: null },
            startedTests: {},
            testStatus: {},
        };
        var testState = {
            currentTest: { slotId: null },
            startedTests: {
                1001: {
                    version: '0.0.1',
                    category: 'B',
                    activityCode: ActivityCodes.PASS,
                    journalData: {
                        testSlotAttributes: {
                            welshTest: false,
                            slotId: 1001,
                            start: '2019-08-28T14:30:00',
                            vehicleTypeCode: 'C',
                            extendedTest: false,
                            specialNeeds: false,
                        },
                        examiner: {
                            staffNumber: '',
                        },
                        testCentre: {
                            centreId: 1,
                            costCode: '',
                        },
                        candidate: {},
                        applicationReference: {
                            applicationId: 999,
                            bookingSequence: 3,
                            checkDigit: 5,
                        },
                    },
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                2008: {
                    version: '0.0.1',
                    category: 'B',
                    activityCode: ActivityCodes.CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION,
                    journalData: {
                        testSlotAttributes: {
                            welshTest: false,
                            slotId: 2008,
                            start: '2019-08-23T15:14:00',
                            vehicleTypeCode: 'C',
                            extendedTest: false,
                            specialNeeds: false,
                        },
                        examiner: {
                            staffNumber: '',
                        },
                        testCentre: {
                            centreId: 1,
                            costCode: '',
                        },
                        candidate: {},
                        applicationReference: {
                            applicationId: 999,
                            bookingSequence: 3,
                            checkDigit: 5,
                        },
                    },
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                2027: {
                    version: '0.0.1',
                    category: 'B',
                    activityCode: ActivityCodes.ACCIDENT,
                    journalData: {
                        testSlotAttributes: {
                            welshTest: false,
                            slotId: 2027,
                            start: '2019-08-30T09:14:00',
                            vehicleTypeCode: 'C',
                            extendedTest: false,
                            specialNeeds: false,
                        },
                        examiner: {
                            staffNumber: '',
                        },
                        testCentre: {
                            centreId: 1,
                            costCode: '',
                        },
                        candidate: {},
                        applicationReference: {
                            applicationId: 999,
                            bookingSequence: 3,
                            checkDigit: 5,
                        },
                    },
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
                3002: {
                    version: '0.0.1',
                    category: 'B',
                    activityCode: ActivityCodes.PASS,
                    journalData: {
                        testSlotAttributes: {
                            welshTest: false,
                            slotId: 3002,
                            start: '2019-08-30T10:14:00',
                            vehicleTypeCode: 'C',
                            extendedTest: false,
                            specialNeeds: false,
                        },
                        examiner: {
                            staffNumber: '',
                        },
                        testCentre: {
                            centreId: 1,
                            costCode: '',
                        },
                        candidate: {},
                        applicationReference: {
                            applicationId: 999,
                            bookingSequence: 3,
                            checkDigit: 5,
                        },
                    },
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
            },
            testStatus: {
                1001: TestStatus.Decided,
                2008: TestStatus.Decided,
                2027: TestStatus.Decided,
                3002: TestStatus.Submitted,
            },
        };
        describe('getIncompleteTests', function () {
            it('should return the unsubmitted tests', function () {
                var result = getIncompleteTests(testState);
                expect(result.length).toEqual(3);
            });
            it('should return no unsubmitted tests', function () {
                var result = getIncompleteTests(initialState);
                expect(result.length).toEqual(0);
            });
        });
        describe('getIncompleteTestsCount', function () {
            it('should return the correct number of unsubmitted tests', function () {
                var result = getIncompleteTestsCount(testState);
                expect(result).toEqual(3);
            });
            it('should return the correct number of unsubmitted tests', function () {
                var result = getIncompleteTestsCount(initialState);
                expect(result).toEqual(0);
            });
        });
        describe('getOldestIncompleteTest', function () {
            it('should return the oldest unsubmitted test', function () {
                var result = getOldestIncompleteTest(testState);
                expect(result.journalData.testSlotAttributes.slotId).toEqual(2008);
            });
            it('should return null for the oldest unsubmitted test', function () {
                var result = getOldestIncompleteTest(initialState);
                expect(result).toBeUndefined();
            });
        });
    });
    describe('isDelegatedTest', function () {
        var testsState = {
            currentTest: { slotId: '12345' },
            startedTests: {
                12345: {
                    version: '0.0.1',
                    category: 'B',
                    activityCode: ActivityCodes.PASS,
                    journalData: {
                        testSlotAttributes: {
                            welshTest: false,
                            slotId: 3002,
                            start: '2019-08-30T10:14:00',
                            vehicleTypeCode: 'C',
                            extendedTest: false,
                            specialNeeds: false,
                        },
                        examiner: {
                            staffNumber: '',
                        },
                        testCentre: {
                            centreId: 1,
                            costCode: '',
                        },
                        candidate: {},
                        applicationReference: {
                            applicationId: 999,
                            bookingSequence: 3,
                            checkDigit: 5,
                        },
                    },
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                },
            },
            testStatus: {},
        };
        it('should return false when no delegated tests possible for the category', function () {
            var localTestsState = __assign(__assign({}, testsState), { startedTests: __assign(__assign({}, testsState.startedTests), { 12345: __assign(__assign({}, testsState.startedTests['12345']), { category: 'B' }) }) });
            var result = isDelegatedTest(localTestsState);
            expect(result).toBe(false);
        });
        it('should return false when test has valid category but delegatedTest flag is not set', function () {
            var localTestsState = __assign(__assign({}, testsState), { startedTests: __assign(__assign({}, testsState.startedTests), { 12345: __assign(__assign({}, testsState.startedTests['12345']), { category: 'B+E', delegatedTest: undefined }) }) });
            var result = isDelegatedTest(localTestsState);
            expect(result).toBe(false);
        });
        it('should return false when test has valid category but delegatedTest flag is set to false', function () {
            var localTestsState = __assign(__assign({}, testsState), { startedTests: __assign(__assign({}, testsState.startedTests), { 12345: __assign(__assign({}, testsState.startedTests['12345']), { category: 'B+E', delegatedTest: false }) }) });
            var result = isDelegatedTest(localTestsState);
            expect(result).toBe(false);
        });
        it('should return true when test has valid common category and delegatedTest flag is set to true', function () {
            var localTestsState = __assign(__assign({}, testsState), { startedTests: __assign(__assign({}, testsState.startedTests), { 12345: __assign(__assign({}, testsState.startedTests['12345']), { category: 'B+E', delegatedTest: true }) }) });
            var result = isDelegatedTest(localTestsState);
            expect(result).toBe(true);
        });
        it('should return true when test has valid CPC category and delegatedTest flag is set to true', function () {
            var localTestsState = __assign(__assign({}, testsState), { startedTests: __assign(__assign({}, testsState.startedTests), { 12345: __assign(__assign({}, testsState.startedTests['12345']), { category: 'CCPC', delegatedTest: true }) }) });
            var result = isDelegatedTest(localTestsState);
            expect(result).toBe(true);
        });
    });
    describe('hasStartedTests', function () {
        it('should return correct data', function () {
            var testsModel = {
                currentTest: null,
                startedTests: {
                    entry1: null,
                },
                testStatus: null,
            };
            var data = hasStartedTests(testsModel);
            expect(data).toEqual(true);
        });
    });
});
//# sourceMappingURL=tests.selector.spec.js.map