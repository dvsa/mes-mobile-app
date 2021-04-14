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
import { TestsEffects } from '../tests.effects';
import { ReplaySubject } from 'rxjs';
import { TestPersistenceProvider } from '../../../providers/test-persistence/test-persistence';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestPersistenceProviderMock } from '../../../providers/test-persistence/__mocks__/test-persistence.mock';
import * as testsActions from '../tests.actions';
import * as testStatusActions from '../test-status/test-status.actions';
import * as rekeyActions from '../rekey/rekey.actions';
import * as journalActions from '../../../modules/journal/journal.actions';
import { PopulateApplicationReference } from '../journal-data/common/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../journal-data/common/candidate/candidate.actions';
import { testApplicationMock, candidateMock, testReportPracticeModeSlot, } from '../__mocks__/tests.mock';
import { initialState, testsReducer } from '../tests.reducer';
import { TestSubmissionProvider } from '../../../providers/test-submission/test-submission';
import { TestSubmissionProviderMock } from '../../../providers/test-submission/__mocks__/test-submission.mock';
import { Store, StoreModule } from '@ngrx/store';
import { NetworkStateProvider, ConnectionStatus } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { DateTime } from '../../../shared/helpers/date-time';
import { PopulateExaminer } from '../journal-data/common/examiner/examiner.actions';
import journalSlotsDataMock from '../../../modules/journal/__mocks__/journal-slots-data.mock';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import * as rekeySearchActions from '../../../pages/rekey-search/rekey-search.actions';
import { NavigationStateProvider } from '../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { rekeySearchReducer } from '../../../pages/rekey-search/rekey-search.reducer';
import { SetExaminerBooked } from '../examiner-booked/examiner-booked.actions';
import { bufferCount } from 'rxjs/operators';
import { SetExaminerConducted } from '../examiner-conducted/examiner-conducted.actions';
import { SetExaminerKeyed } from '../examiner-keyed/examiner-keyed.actions';
import { PopulateTestCategory } from '../category/category.actions';
import { configureTestSuite } from 'ng-bullet';
import { OtherReasonUpdated, OtherSelected } from '../rekey-reason/rekey-reason.actions';
import { StartDelegatedTest } from '../delegated-test/delegated-test.actions';
describe('Tests Effects', function () {
    var effects;
    var actions$;
    var testPersistenceProviderMock;
    var store$;
    var navigationStateProviderMock;
    var authenticationProviderMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    journal: journalReducer,
                    tests: testsReducer,
                    rekeySearch: rekeySearchReducer,
                }),
            ],
            providers: [
                TestsEffects,
                provideMockActions(function () { return actions$; }),
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: TestPersistenceProvider, useClass: TestPersistenceProviderMock },
                { provide: TestSubmissionProvider, useClass: TestSubmissionProviderMock },
                { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(TestsEffects);
        testPersistenceProviderMock = TestBed.get(TestPersistenceProvider);
        navigationStateProviderMock = TestBed.get(NavigationStateProvider);
        authenticationProviderMock = TestBed.get(AuthenticationProvider);
        store$ = TestBed.get(Store);
    });
    describe('persistTestsEffect', function () {
        it('should respond to a PERSIST_TESTS action and delegate to the persistence provider', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(12345, "B" /* B */));
            testPersistenceProviderMock.persistTests.and.returnValue(Promise.resolve());
            // ACT
            actions$.next(new testsActions.PersistTests());
            // ASSERT
            effects.persistTestsEffect$.subscribe(function () {
                expect(testPersistenceProviderMock.persistTests).toHaveBeenCalled();
                done();
            });
        });
    });
    describe('loadPersistedTestsEffect', function () {
        it('should respond to a LOAD_PERSISTED_TESTS action by loading tests and dispatching a success action', function (done) {
            // ARRANGE
            var persistedTests = __assign(__assign({}, initialState), { currentTest: __assign(__assign({}, initialState.currentTest), { slotId: '123' }) });
            testPersistenceProviderMock.loadPersistedTests.and.returnValue(Promise.resolve(persistedTests));
            // ACT
            actions$.next(new testsActions.LoadPersistedTests());
            // ASSERT
            effects.loadPersistedTestsEffect$.subscribe(function (emission) {
                expect(testPersistenceProviderMock.loadPersistedTests).toHaveBeenCalled();
                expect(emission).toEqual(new testsActions.LoadPersistedTestsSuccess(persistedTests));
                done();
            });
        });
    });
    describe('startPracticeTestEffect', function () {
        it('should dispatch the PopulateApplicationReference and PopulateCandidateDetails action', function (done) {
            // ACT
            actions$.next(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
            // ASSERT
            effects.startPracticeTestEffect$.subscribe(function (result) {
                if (result instanceof PopulateApplicationReference) {
                    expect(result).toEqual(new PopulateApplicationReference(testApplicationMock));
                }
                if (result instanceof PopulateCandidateDetails) {
                    expect(result).toEqual(new PopulateCandidateDetails(candidateMock));
                }
                done();
            });
        });
    });
    describe('sendCompletedTestsEffect', function () {
        it('should dispatch use the order of the responses to coordinate subsequent dispatching of actions', function (done) {
            // ARRANGE
            // Adds three tests as 'Completed' for the sendCompletedTestsEffect to consume
            // The http responses are mocked in test-submission.mock.ts
            var currentTestSlotId = '12345'; // Mocked as a 201 http response
            var currentTestSlotId1 = '123456'; // Mocked as a 201 http response
            var currentTestSlotId2 = '1234567'; // Mocked as a 500 http error response
            store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
            store$.dispatch(new testStatusActions.SetTestStatusCompleted(testReportPracticeModeSlot.slotDetail.slotId));
            store$.dispatch(new testsActions.StartTest(Number(currentTestSlotId), "B" /* B */));
            store$.dispatch(new testStatusActions.SetTestStatusCompleted(currentTestSlotId));
            store$.dispatch(new testsActions.StartTest(Number(currentTestSlotId1), "B" /* B */));
            store$.dispatch(new testStatusActions.SetTestStatusCompleted(currentTestSlotId1));
            store$.dispatch(new testsActions.StartTest(Number(currentTestSlotId2), "B" /* B */));
            store$.dispatch(new testStatusActions.SetTestStatusCompleted(currentTestSlotId2));
            // ACT
            actions$.next(new testsActions.SendCompletedTests());
            // ASSERT
            effects.sendCompletedTestsEffect$.subscribe(function (result) {
                if (result instanceof testsActions.SendCompletedTestSuccess) {
                    if (result.completedTestId === currentTestSlotId) {
                        expect(result).toEqual(new testsActions.SendCompletedTestSuccess(currentTestSlotId));
                    }
                    if (result.completedTestId === currentTestSlotId1) {
                        expect(result).toEqual(new testsActions.SendCompletedTestSuccess(currentTestSlotId1));
                    }
                    if (result.completedTestId === currentTestSlotId2) {
                        expect(result).toEqual(new testsActions.SendCompletedTestsFailure());
                    }
                    if (result.completedTestId === testReportPracticeModeSlot.slotDetail.slotId) {
                        fail('Practice test should not be submitted');
                    }
                }
                done();
            });
        });
    });
    describe('sendCurrentTestSuccessEffect', function () {
        it('should dispatch the TestStatusSubmitted action', function (done) {
            var currentTestSlotId = '12345';
            store$.dispatch(new testsActions.StartTest(12345, "B" /* B */));
            // ACT
            actions$.next(new testsActions.SendCurrentTestSuccess());
            // ASSERT
            effects.sendCurrentTestSuccessEffect$.subscribe(function (result) {
                if (result instanceof testStatusActions.SetTestStatusSubmitted) {
                    expect(result).toEqual(new testStatusActions.SetTestStatusSubmitted(currentTestSlotId));
                }
                if (result instanceof testsActions.PersistTests) {
                    expect(result).toEqual(new testsActions.PersistTests());
                }
                done();
            });
        });
    });
    describe('startTestEffect', function () {
        it('should copy the examiner from the journal state into the test state', function (done) {
            var selectedDate = new DateTime().format('YYYY-MM-DD');
            var examiner = { staffNumber: '123', individualId: 456 };
            store$.dispatch(new journalActions.SetSelectedDate(selectedDate));
            store$.dispatch(new journalActions.LoadJournalSuccess({ examiner: examiner, slotItemsByDate: journalSlotsDataMock }, ConnectionStatus.ONLINE, false, new Date())); // Load in mock journal state
            // ACT
            actions$.next(new testsActions.StartTest(1001, "B" /* B */));
            // ASSERT
            effects.startTestEffect$
                .pipe(bufferCount(10))
                .subscribe(function (_a) {
                var res0 = _a[0], res1 = _a[1], res2 = _a[2], res3 = _a[3], res4 = _a[4], res5 = _a[5], res6 = _a[6], res7 = _a[7], res8 = _a[8], res9 = _a[9];
                expect(res1).toEqual(new PopulateExaminer(examiner)),
                    expect(res7).toEqual(new SetExaminerBooked(parseInt(examiner.staffNumber, 10))),
                    expect(res8).toEqual(new SetExaminerConducted(parseInt(examiner.staffNumber, 10))),
                    expect(res9).toEqual(new SetExaminerKeyed(parseInt(authenticationProviderMock.getEmployeeId(), 10))),
                    done();
            });
        });
        it('should mark the test as a rekey when this is a rekey', function (done) {
            var selectedDate = new DateTime().format('YYYY-MM-DD');
            var examiner = { staffNumber: '123', individualId: 456 };
            store$.dispatch(new journalActions.SetSelectedDate(selectedDate));
            store$.dispatch(new journalActions.LoadJournalSuccess({ examiner: examiner, slotItemsByDate: journalSlotsDataMock }, ConnectionStatus.ONLINE, false, new Date())); // Load in mock journal state
            // ACT
            actions$.next(new testsActions.StartTest(1001, "B" /* B */, true));
            // ASSERT
            effects.startTestEffect$
                .pipe(bufferCount(13))
                .subscribe(function (_a) {
                var res0 = _a[0], res1 = _a[1], res2 = _a[2], res3 = _a[3], res4 = _a[4], res5 = _a[5], res6 = _a[6], res7 = _a[7], res8 = _a[8], res9 = _a[9], res10 = _a[10], res11 = _a[11], res12 = _a[12];
                expect(res1).toEqual(new PopulateExaminer(examiner)),
                    expect(res7).toEqual(new SetExaminerBooked(parseInt(examiner.staffNumber, 10))),
                    expect(res8).toEqual(new SetExaminerConducted(parseInt(examiner.staffNumber, 10))),
                    expect(res9).toEqual(new SetExaminerKeyed(parseInt(authenticationProviderMock.getEmployeeId(), 10))),
                    expect(res12).toEqual(new rekeyActions.MarkAsRekey()),
                    done();
            });
        });
        it('should get the slot from booked slots when this is a rekey test started from the rekey search', function (done) {
            spyOn(navigationStateProviderMock, 'isRekeySearch').and.returnValue(true);
            var testSlot = {
                slotDetail: {
                    slotId: 4363463,
                },
                testCentre: {
                    centreId: 54321,
                    centreName: 'Example Test Centre',
                    costCode: 'EXTC1',
                },
                booking: {
                    application: {
                        applicationId: 12345,
                        bookingSequence: 11,
                        checkDigit: 1,
                        testCategory: "B" /* B */,
                    },
                },
            };
            var staffNumber = '654321';
            store$.dispatch(new rekeySearchActions.SearchBookedTestSuccess(testSlot, staffNumber));
            // ACT
            actions$.next(new testsActions.StartTest(1001, testSlot.booking.application.testCategory, true));
            // ASSERT
            effects.startTestEffect$
                .pipe(bufferCount(13))
                .subscribe(function (_a) {
                var res0 = _a[0], res1 = _a[1], res2 = _a[2], res3 = _a[3], res4 = _a[4], res5 = _a[5], res6 = _a[6], res7 = _a[7], res8 = _a[8], res9 = _a[9], res10 = _a[10], res11 = _a[11], res12 = _a[12];
                expect(res0).toEqual(new PopulateTestCategory(testSlot.booking.application.testCategory));
                expect(res1).toEqual(new PopulateExaminer({ staffNumber: staffNumber })),
                    expect(res2).toEqual(new PopulateApplicationReference(testSlot.booking.application)),
                    expect(res3).toEqual(new PopulateCandidateDetails(testSlot.booking.candidate)),
                    expect(res7).toEqual(new SetExaminerBooked(parseInt(staffNumber, 10))),
                    expect(res8).toEqual(new SetExaminerConducted(parseInt(staffNumber, 10))),
                    expect(res9).toEqual(new SetExaminerKeyed(parseInt(authenticationProviderMock.getEmployeeId(), 10))),
                    expect(res12).toEqual(new rekeyActions.MarkAsRekey()),
                    done();
            });
        });
        it('should set the rekey reason and reason correctly when it is a delegated examiner test', function (done) {
            var selectedDate = new DateTime().format('YYYY-MM-DD');
            var examiner = { staffNumber: '123', individualId: 456 };
            store$.dispatch(new journalActions.SetSelectedDate(selectedDate));
            store$.dispatch(new journalActions.LoadJournalSuccess({ examiner: examiner, slotItemsByDate: journalSlotsDataMock }, ConnectionStatus.ONLINE, false, new Date())); // Load in mock journal state
            // ACT
            actions$.next(new testsActions.StartTest(1001, "B" /* B */, false, true));
            // ASSERT
            effects.startTestEffect$
                .pipe(bufferCount(15))
                .subscribe(function (_a) {
                var res0 = _a[0], res1 = _a[1], res2 = _a[2], res3 = _a[3], res4 = _a[4], res5 = _a[5], res6 = _a[6], res7 = _a[7], res8 = _a[8], res9 = _a[9], res10 = _a[10], res11 = _a[11], res12 = _a[12], res13 = _a[13], res14 = _a[14];
                expect(res12).toEqual(new StartDelegatedTest());
                expect(res13).toEqual(new OtherSelected(true));
                expect(res14).toEqual(new OtherReasonUpdated('Delegated Examiner'));
                done();
            });
        });
    });
    describe('activateTestEffect', function () {
        it('should call theMarkAsRekey action', function (done) {
            // ACT
            actions$.next(new testsActions.ActivateTest(1234, "B" /* B */, true));
            // ASSERT
            effects.activateTestEffect$.subscribe(function (result) {
                expect(result instanceof rekeyActions.MarkAsRekey).toBe(true);
                done();
            });
        });
    });
    describe('sendPartialTest', function () {
        it('should call the ', function (done) {
            // Act
            actions$.next(new testStatusActions.SetTestStatusWriteUp('123'));
            // Assert
            effects.sendPartialTest$.subscribe(function (result) {
                expect(result instanceof testsActions.SendCompletedTests).toBeTruthy();
                done();
            });
        });
    });
});
//# sourceMappingURL=tests.effects.spec.js.map