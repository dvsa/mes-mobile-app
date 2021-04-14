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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from, of, interval } from 'rxjs';
import * as testActions from './tests.actions';
import * as testStatusActions from './test-status/test-status.actions';
import { PopulateApplicationReference } from './journal-data/common/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from './journal-data/common/candidate/candidate.actions';
import { testReportPracticeModeSlot } from './__mocks__/tests.mock';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { Store, select } from '@ngrx/store';
import { getTests } from './tests.reducer';
import { getCurrentTest, isPracticeMode, getCurrentTestSlotId, getCurrentTestStatus } from './tests.selector';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { find, startsWith, omit, has } from 'lodash';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { TestStatus } from './test-status/test-status.model';
import { getJournalState } from '../journal/journal.reducer';
import { getSlotsOnSelectedDate } from '../journal/journal.selector';
import { PopulateExaminer } from './journal-data/common/examiner/examiner.actions';
import { PopulateTestSlotAttributes } from './journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { extractTestSlotAttributes } from './journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { PopulateTestCentre } from './journal-data/common/test-centre/test-centre.actions';
import { extractTestCentre } from './journal-data/common/test-centre/test-centre.selector';
import { PopulateTestCategory } from './category/category.actions';
import { PopulateTestSchemaVersion } from './schema-version/schema-version.actions';
import { SetExaminerBooked } from './examiner-booked/examiner-booked.actions';
import { SetExaminerConducted } from './examiner-conducted/examiner-conducted.actions';
import { SetExaminerKeyed } from './examiner-keyed/examiner-keyed.actions';
import { MarkAsRekey } from './rekey/rekey.actions';
import { getRekeySearchState } from '../../pages/rekey-search/rekey-search.reducer';
import { getBookedTestSlot, getStaffNumber } from '../../pages/rekey-search/rekey-search.selector';
import { getBookedTestSlot as getDelegatedBookedTestSlot, } from '../../pages/delegated-rekey-search/delegated-rekey-search.selector';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { NavigationStateProvider } from '../../providers/navigation-state/navigation-state';
import { PopulateConductedLanguage } from './communication-preferences/communication-preferences.actions';
import { Language } from './communication-preferences/communication-preferences.model';
import { version } from '../../environment/test-schema-version';
import { createPopulateCandidateDetailsAction } from './journal-data/common/candidate/candidate.action-creator';
import { GearboxCategoryChanged, PopulateVehicleDimensions } from './vehicle-details/common/vehicle-details.actions';
import { InitializeVehicleChecks as InitializeVehicleChecksCatC, } from './test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { InitializeVehicleChecks as InitializeVehicleChecksCatD, } from './test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
import { IndependentDrivingTypeChanged, RouteNumberChanged } from './test-summary/common/test-summary.actions';
import { StartDelegatedTest } from './delegated-test/delegated-test.actions';
import { getDelegatedRekeySearchState, } from '../../pages/delegated-rekey-search/delegated-rekey-search.reducer';
import { OtherReasonUpdated, OtherSelected } from './rekey-reason/rekey-reason.actions';
var TestsEffects = /** @class */ (function () {
    function TestsEffects(actions$, testPersistenceProvider, testSubmissionProvider, appConfigProvider, networkStateProvider, store$, authenticationProvider, navigationStateProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.testPersistenceProvider = testPersistenceProvider;
        this.testSubmissionProvider = testSubmissionProvider;
        this.appConfigProvider = appConfigProvider;
        this.networkStateProvider = networkStateProvider;
        this.store$ = store$;
        this.authenticationProvider = authenticationProvider;
        this.navigationStateProvider = navigationStateProvider;
        this.persistTestsEffect$ = this.actions$.pipe(ofType(testActions.PERSIST_TESTS), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(isPracticeMode)))); }), filter(function (_a) {
            var action = _a[0], tests = _a[1], isPracticeMode = _a[2];
            return !isPracticeMode;
        }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            return _this.testPersistenceProvider.persistTests(_this.getSaveableTestsObject(tests));
        }), catchError(function (err) {
            console.log("Error persisting tests: " + err);
            return of();
        }));
        this.loadPersistedTestsEffect$ = this.actions$.pipe(ofType(testActions.LOAD_PERSISTED_TESTS), switchMap(function () { return from(_this.testPersistenceProvider.loadPersistedTests()).pipe(filter(function (testsModel) { return testsModel !== null; }), map(function (testsModel) { return new testActions.LoadPersistedTestsSuccess(testsModel); }), catchError(function (err) {
            console.log("Error reading persisted tests: " + err);
            return of();
        })); }));
        this.startTestEffect$ = this.actions$.pipe(ofType(testActions.START_TEST), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getJournalState)), _this.store$.pipe(select(getRekeySearchState)), _this.store$.pipe(select(getDelegatedRekeySearchState)))); }), switchMap(function (_a) {
            var action = _a[0], journal = _a[1], rekeySearch = _a[2], delegatedRekeySearch = _a[3];
            var startTestAction = action;
            var isRekeySearch = _this.navigationStateProvider.isRekeySearch();
            var isDelegatedRekeySearch = _this.navigationStateProvider.isDelegatedExaminerRekeySearch();
            var employeeId = _this.authenticationProvider.getEmployeeId() || journal.examiner.staffNumber;
            var slot;
            var examiner;
            var examinerKeyed = employeeId;
            var examinerBooked;
            if (isDelegatedRekeySearch) {
                slot = getDelegatedBookedTestSlot(delegatedRekeySearch);
                examiner = {
                    staffNumber: slot['examinerId'],
                };
            }
            else if (isRekeySearch) {
                examinerBooked = getStaffNumber(rekeySearch);
                examiner = {
                    staffNumber: examinerBooked,
                };
                slot = getBookedTestSlot(rekeySearch);
            }
            else {
                examinerBooked = journal.examiner.staffNumber;
                examiner = journal.examiner;
                var slots = getSlotsOnSelectedDate(journal);
                var slotData = slots.map(function (slot) { return slot.slotData; });
                slot = slotData.find(function (data) { return data.slotDetail.slotId === startTestAction.slotId && has(data, 'booking'); });
            }
            var testSlotAttributes = extractTestSlotAttributes(slot);
            var conductedLanguage = testSlotAttributes.welshTest ? Language.CYMRAEG : Language.ENGLISH;
            examiner.individualId;
            var arrayOfActions = [
                new PopulateTestCategory(startTestAction.category),
                new PopulateExaminer(examiner),
                new PopulateApplicationReference(slot.booking.application),
                createPopulateCandidateDetailsAction(startTestAction.category, slot.booking),
                new PopulateTestSlotAttributes(testSlotAttributes),
                new PopulateTestCentre(extractTestCentre(slot)),
                new testStatusActions.SetTestStatusBooked(startTestAction.slotId.toString()),
                new SetExaminerBooked(parseInt(examinerBooked, 10) ? parseInt(examinerBooked, 10) : null),
                new SetExaminerConducted(parseInt(examinerBooked, 10) ? parseInt(examinerBooked, 10) : null),
                new SetExaminerKeyed(parseInt(examinerKeyed, 10) ? parseInt(examinerKeyed, 10) : null),
                new PopulateConductedLanguage(conductedLanguage),
                new PopulateTestSchemaVersion(version),
            ];
            if (startTestAction.category !== "B" /* B */
                && startTestAction.category !== "ADI2" /* ADI2 */) {
                arrayOfActions.push(new PopulateVehicleDimensions(slot.booking.application.vehicleWidth, slot.booking.application.vehicleLength));
            }
            if (startTestAction.rekey) {
                arrayOfActions.push(new MarkAsRekey());
            }
            if (startTestAction.delegatedTest) {
                arrayOfActions.push(new StartDelegatedTest());
                arrayOfActions.push(new OtherSelected(true));
                arrayOfActions.push(new OtherReasonUpdated('Delegated Examiner'));
            }
            if (startTestAction.category === "C" /* C */ ||
                startTestAction.category === "C1" /* C1 */ ||
                startTestAction.category === "C1+E" /* C1E */ ||
                startTestAction.category === "C+E" /* CE */) {
                arrayOfActions.push(new InitializeVehicleChecksCatC(startTestAction.category));
            }
            if (startTestAction.category === "D" /* D */ ||
                startTestAction.category === "D1" /* D1 */ ||
                startTestAction.category === "D1+E" /* D1E */ ||
                startTestAction.category === "D+E" /* DE */) {
                arrayOfActions.push(new InitializeVehicleChecksCatD(startTestAction.category));
            }
            if (startTestAction.category === "F" /* F */ ||
                startTestAction.category === "G" /* G */ ||
                startTestAction.category === "H" /* H */ ||
                startTestAction.category === "K" /* K */) {
                arrayOfActions.push(new GearboxCategoryChanged('Manual'));
                arrayOfActions.push(new RouteNumberChanged(88));
                arrayOfActions.push(new IndependentDrivingTypeChanged('N/A'));
            }
            return arrayOfActions;
        }));
        this.activateTestEffect$ = this.actions$.pipe(ofType(testActions.ACTIVATE_TEST), filter(function (action) { return action.rekey; }), map(function (action) {
            var activateTestAction = action;
            if (activateTestAction.rekey) {
                return new MarkAsRekey();
            }
        }));
        this.startPracticeTestEffect$ = this.actions$.pipe(ofType(testActions.START_TEST_REPORT_PRACTICE_TEST), switchMap(function () {
            var slotData = __assign({}, testReportPracticeModeSlot);
            return [
                new PopulateTestCategory(slotData.booking.application.testCategory),
                new PopulateApplicationReference(slotData.booking.application),
                new PopulateCandidateDetails(slotData.booking.candidate),
            ];
        }));
        this.startSendingCompletedTestsEffect$ = this.actions$.pipe(ofType(testActions.START_SENDING_COMPLETED_TESTS), switchMap(function () {
            return interval(_this.appConfigProvider.getAppConfig().tests.autoSendInterval)
                .pipe(map(function () { return new testActions.SendCompletedTests(); }));
        }));
        this.sendPartialTest$ = this.actions$.pipe(ofType(testStatusActions.SET_TEST_STATUS_WRITE_UP), map(function () { return new testActions.SendCompletedTests(); }));
        this.sendCompletedTestsEffect$ = this.actions$.pipe(ofType(testActions.SEND_COMPLETED_TESTS), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), filter(function () { return _this.networkStateProvider.getNetworkState() === ConnectionStatus.ONLINE; }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var completedTestKeys = Object.keys(tests.testStatus).filter(function (slotId) {
                return slotId !== testReportPracticeSlotId &&
                    !startsWith(slotId, end2endPracticeSlotId) &&
                    (tests.testStatus[slotId] === TestStatus.Completed || tests.testStatus[slotId] === TestStatus.WriteUp) &&
                    !tests.startedTests[slotId].rekey;
            });
            var completedTests = completedTestKeys.map(function (slotId, index) { return ({
                index: index,
                slotId: slotId,
                payload: tests.startedTests[slotId],
                status: tests.testStatus[slotId],
            }); });
            if (completedTests.length === 0) {
                return of();
            }
            return _this.testSubmissionProvider.submitTests(completedTests)
                .pipe(switchMap(function (responses) {
                return responses.map(function (response, index) {
                    var matchedTests = find(completedTests, ['index', index]);
                    if (response.status === HttpStatusCodes.CREATED) {
                        return matchedTests.status === TestStatus.WriteUp
                            ? new testActions.SendPartialTestSuccess(matchedTests.slotId)
                            : new testActions.SendCompletedTestSuccess(matchedTests.slotId);
                    }
                    return matchedTests.status === TestStatus.WriteUp
                        ? new testActions.SendPartialTestsFailure()
                        : new testActions.SendCompletedTestsFailure();
                });
            }));
        }));
        this.sendPartialTestSuccessEffect$ = this.actions$.pipe(ofType(testActions.SEND_PARTIAL_TEST_SUCCESS), switchMap(function (action) {
            return [
                new testStatusActions.SetTestStatusAutosaved(action.slotId),
                new testActions.PersistTests(),
            ];
        }));
        this.sendCompletedTestsSuccessEffect$ = this.actions$.pipe(ofType(testActions.SEND_COMPLETED_TEST_SUCCESS), switchMap(function (action) {
            return [
                new testStatusActions.SetTestStatusSubmitted(action.completedTestId),
                new testActions.PersistTests(),
            ];
        }));
        this.setTestStatusCompletedEffect$ = this.actions$.pipe(ofType(testStatusActions.SET_TEST_STATUS_COMPLETED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTest)))); }), map(function (_a) {
            var action = _a[0], currentTest = _a[1];
            return new testActions.SendCompletedTests();
        }));
        this.sendCurrentTestEffect$ = this.actions$.pipe(ofType(testActions.SEND_CURRENT_TEST), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var slotId = getCurrentTestSlotId(tests);
            var test = getCurrentTest(tests);
            var testStatus = getCurrentTestStatus(tests);
            var testToSubmit = {
                slotId: slotId,
                index: 0,
                payload: test,
                status: testStatus,
            };
            return _this.testSubmissionProvider.submitTest(testToSubmit)
                .pipe(map(function (response) {
                if (response.status === HttpStatusCodes.CREATED) {
                    return new testActions.SendCurrentTestSuccess();
                }
                return new testActions.SendCurrentTestFailure(response.status === HttpStatusCodes.CONFLICT);
            }));
        }));
        this.sendCurrentTestSuccessEffect$ = this.actions$.pipe(ofType(testActions.SEND_CURRENT_TEST_SUCCESS), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTestSlotId)))); }), switchMap(function (_a) {
            var action = _a[0], slotId = _a[1];
            return [
                new testStatusActions.SetTestStatusSubmitted(slotId),
                new testActions.PersistTests(),
            ];
        }));
    }
    TestsEffects.prototype.getSaveableTestsObject = function (tests) {
        var testsNotToSave = Object.keys(tests.startedTests).filter(function (key) {
            return startsWith(key, testReportPracticeSlotId) ||
                startsWith(key, end2endPracticeSlotId);
        });
        return {
            currentTest: {
                slotId: testsNotToSave.includes(tests.currentTest.slotId) ? null : tests.currentTest.slotId,
            },
            startedTests: omit(tests.startedTests, testsNotToSave),
            testStatus: omit(tests.testStatus, testsNotToSave),
        };
    };
    __decorate([
        Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "persistTestsEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "loadPersistedTestsEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "startTestEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "activateTestEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "startPracticeTestEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "startSendingCompletedTestsEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "sendPartialTest$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "sendCompletedTestsEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "sendPartialTestSuccessEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "sendCompletedTestsSuccessEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "setTestStatusCompletedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "sendCurrentTestEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsEffects.prototype, "sendCurrentTestSuccessEffect$", void 0);
    TestsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            TestPersistenceProvider,
            TestSubmissionProvider,
            AppConfigProvider,
            NetworkStateProvider,
            Store,
            AuthenticationProvider,
            NavigationStateProvider])
    ], TestsEffects);
    return TestsEffects;
}());
export { TestsEffects };
//# sourceMappingURL=tests.effects.js.map