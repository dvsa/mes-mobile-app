import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestOutcomeComponent } from '../test-outcome';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { NavControllerMock } from 'ionic-mocks';
import { StartTest, ActivateTest } from '../../../../modules/tests/tests.actions';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { CAT_B, CAT_BE, CAT_C, CAT_D, CAT_A_MOD1, CAT_A_MOD2 } from '../../../../pages/page-names.constants';
import { DateTime, Duration } from '../../../../shared/helpers/date-time';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { LogHelper } from '../../../../providers/logs/logsHelper';
import { LogHelperMock } from '../../../../providers/logs/__mocks__/logsHelper.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Test Outcome', function () {
    var fixture;
    var component;
    var store$;
    var navController;
    var testSlotDetail = {
        duration: 57,
        slotId: 123,
        start: new DateTime().toString(),
    };
    var journal = {
        isLoading: false,
        lastRefreshed: new Date(),
        slots: {},
        selectedDate: 'dummy',
        examiner: { staffNumber: '123', individualId: 456 },
        completedTests: [],
    };
    var categoryPages = [
        { category: "B" /* B */, pageConstant: CAT_B },
        { category: "B+E" /* BE */, pageConstant: CAT_BE },
        { category: "C" /* C */, pageConstant: CAT_C },
        { category: "C+E" /* CE */, pageConstant: CAT_C },
        { category: "C1" /* C1 */, pageConstant: CAT_C },
        { category: "C1+E" /* C1E */, pageConstant: CAT_C },
        { category: "D" /* D */, pageConstant: CAT_D },
        { category: "D+E" /* DE */, pageConstant: CAT_D },
        { category: "D1" /* D1 */, pageConstant: CAT_D },
        { category: "D1+E" /* D1E */, pageConstant: CAT_D },
        { category: "EUAM1" /* EUAM1 */, pageConstant: CAT_A_MOD1 },
        { category: "EUA2M1" /* EUA2M1 */, pageConstant: CAT_A_MOD1 },
        { category: "EUAM1" /* EUAM1 */, pageConstant: CAT_A_MOD1 },
        { category: "EUAMM1" /* EUAMM1 */, pageConstant: CAT_A_MOD1 },
        { category: "EUAM2" /* EUAM2 */, pageConstant: CAT_A_MOD2 },
        { category: "EUA2M2" /* EUA2M2 */, pageConstant: CAT_A_MOD2 },
        { category: "EUAM2" /* EUAM2 */, pageConstant: CAT_A_MOD2 },
        { category: "EUAMM2" /* EUAMM2 */, pageConstant: CAT_A_MOD2 },
        { category: "EUA1M1" /* EUA1M1 */, pageConstant: CAT_A_MOD1 },
        { category: "EUA1M2" /* EUA1M2 */, pageConstant: CAT_A_MOD2 },
    ];
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TestOutcomeComponent],
            imports: [
                IonicModule.forRoot(TestOutcomeComponent),
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {},
                        testStatus: {},
                        startedTests: {
                            1234: {
                                category: 'B',
                                activityCode: ActivityCodes.BAD_LIGHT,
                                journalData: {},
                                rekey: false,
                            },
                        },
                    }); },
                    journal: function () { return (journal); },
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: LogHelper, useClass: LogHelperMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestOutcomeComponent);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('startTest', function () {
            it('should dispatch a start test action with the slot', function () {
                component.slotDetail = testSlotDetail;
                component.category = "B" /* B */;
                component.startTest();
                expect(store$.dispatch).toHaveBeenCalledWith(new StartTest(component.slotDetail.slotId, component.category));
            });
            it('should dispatch a start test action with the slot', function () {
                component.slotDetail = testSlotDetail;
                component.category = "C" /* C */;
                component.startTest();
                expect(store$.dispatch).toHaveBeenCalledWith(new StartTest(component.slotDetail.slotId, component.category));
            });
        });
        describe('earlyStart', function () {
            it('should create and present the early start modal', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.add(8, Duration.MINUTE);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Booked;
                spyOn(component, 'displayCheckStartModal');
                fixture.detectChanges();
                var startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
                startButton.triggerEventHandler('click', null);
                expect(component.displayCheckStartModal).toHaveBeenCalled();
            });
            it('should not create and present the early start modal', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.add(2, Duration.MINUTE);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Booked;
                spyOn(component, 'displayCheckStartModal');
                fixture.detectChanges();
                var startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
                startButton.triggerEventHandler('click', null);
                expect(component.displayCheckStartModal).not.toHaveBeenCalled();
            });
        });
        describe('writeUpTest', function () {
            categoryPages.forEach(function (cat) {
                it("should dispatch an ActivateTest action and navigate to the Office Cat " + cat.category + " page", function () {
                    component.slotDetail = testSlotDetail;
                    component.category = cat.category;
                    component.writeUpTest();
                    expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, cat.category));
                    var calls = navController.push.calls;
                    expect(calls.argsFor(0)[0]).toBe(cat.pageConstant.OFFICE_PAGE);
                });
            });
        });
        describe('resumeTest', function () {
            categoryPages.forEach(function (cat) {
                it("Cat " + cat.category + " should dispatch an ActivateTest action and navigate to the Waiting Room page", function () {
                    component.testStatus = TestStatus.Started;
                    component.slotDetail = testSlotDetail;
                    component.category = cat.category;
                    component.resumeTest();
                    expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, cat.category));
                    var calls = navController.push.calls;
                    expect(calls.argsFor(0)[0]).toBe(cat.pageConstant.WAITING_ROOM_PAGE);
                });
                it("Cat " + cat.category + " should dispatch an ActivateTest action and\n         navigate to the Pass Finalisation page", function () {
                    component.testStatus = TestStatus.Decided;
                    component.slotDetail = testSlotDetail;
                    component.activityCode = ActivityCodes.PASS;
                    component.category = cat.category;
                    component.resumeTest();
                    expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, cat.category));
                    var calls = navController.push.calls;
                    expect(calls.argsFor(0)[0]).toBe(cat.pageConstant.PASS_FINALISATION_PAGE);
                });
                it("Cat " + cat.category + " should dispatch an ActivateTest action\n        and navigate to the Non Pass Finalisation page", function () {
                    component.testStatus = TestStatus.Decided;
                    component.slotDetail = testSlotDetail;
                    component.activityCode = ActivityCodes.FAIL;
                    component.category = cat.category;
                    component.resumeTest();
                    expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, cat.category));
                    var calls = navController.push.calls;
                    expect(calls.argsFor(0)[0]).toBe(cat.pageConstant.NON_PASS_FINALISATION_PAGE);
                });
            });
        });
        describe('showRekeyButton', function () {
            it('should return false for a completed test', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Completed;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(false);
            });
            it('should return true for a booked test on the rekey search page', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Booked;
                component.isTestSlotOnRekeySearch = true;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(true);
            });
            it('should return false for a completed test on the rekey search page', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Completed;
                component.isTestSlotOnRekeySearch = true;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(false);
            });
            it('should return true for a test that was started as a rekey and the date is in the past', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.subtract(1, Duration.DAY);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Started;
                component.isRekey = true;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(true);
            });
            it('should return false for test that was started as a rekey and the date is today', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Started;
                component.isRekey = true;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(false);
            });
            it('should return true for a new test if date is in past', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.subtract(1, Duration.DAY);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = null;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(true);
            });
            it('should return true for a booked test if date is in past', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.subtract(1, Duration.DAY);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Booked;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(true);
            });
            it('should return false for a resumed test if date is in past', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.subtract(1, Duration.DAY);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Started;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(false);
            });
            it('should return true for a booked test if date is in the past', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.subtract(1, Duration.DAY);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Booked;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(true);
            });
            it('should return false for a booked test if date is today', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Booked;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(false);
            });
            it('should return false for a resumed test if date is today', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Started;
                component.showRekeyButton();
                expect(component.showRekeyButton()).toEqual(false);
            });
        });
        describe('getTestStartingPage', function () {
            categoryPages.forEach(function (cat) {
                it("should return the correct value for a Category " + cat.category + " Test", function () {
                    component.category = cat.category;
                    expect(component.getTestStartingPage()).toEqual(cat.pageConstant.WAITING_ROOM_PAGE);
                });
            });
        });
        describe('getPassFinalisationPage', function () {
            categoryPages.forEach(function (cat) {
                it("should return the correct value for a Category " + cat.category + " Test", function () {
                    component.category = cat.category;
                    expect(component.getPassFinalisationPage()).toEqual(cat.pageConstant.PASS_FINALISATION_PAGE);
                });
            });
        });
        describe('getNonPassFinalisationPage', function () {
            categoryPages.forEach(function (cat) {
                it("should return the correct value for a Category " + cat.category + " Test", function () {
                    component.category = cat.category;
                    expect(component.getNonPassFinalisationPage()).toEqual(cat.pageConstant.NON_PASS_FINALISATION_PAGE);
                });
            });
        });
    });
    describe('DOM', function () {
        describe('show start test button', function () {
            it('should show the start test button when the test status is Booked', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Booked;
                fixture.detectChanges();
                var startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
                expect(startButton.length).toBe(1);
            });
            it('should not show the start test button when the test has a status other than booked', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Started;
                fixture.detectChanges();
                var startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
                expect(startButton.length).toBe(0);
            });
        });
        describe('start a test', function () {
            it('should call the startTest method when `Start test` is clicked', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Booked;
                fixture.detectChanges();
                spyOn(component, 'startTest');
                var startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
                startButton.triggerEventHandler('click', null);
                expect(component.startTest).toHaveBeenCalled();
            });
        });
        describe('rekey a test', function () {
            it('should call the rekeyTest method when `Rekey` is clicked', function () {
                component.slotDetail = testSlotDetail;
                component.category = "B" /* B */;
                component.testStatus = TestStatus.Booked;
                var dateTime = new DateTime();
                dateTime.subtract(1, Duration.DAY);
                component.slotDetail.start = dateTime.toString();
                fixture.detectChanges();
                spyOn(component, 'rekeyTest');
                var rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));
                rekeyButton.triggerEventHandler('click', null);
                expect(component.rekeyTest).toHaveBeenCalled();
            });
            categoryPages.forEach(function (cat) {
                it("should navigate to cat " + cat.category + " waiting room page when \"Rekey\" is clicked", function () {
                    component.slotDetail = testSlotDetail;
                    component.category = cat.category;
                    component.rekeyTest();
                    var calls = navController.push.calls;
                    expect(calls.argsFor(0)[0]).toBe(cat.pageConstant.WAITING_ROOM_PAGE);
                });
            });
        });
        describe('rekeyDelegatedTest', function () {
            it('should call the rekeyDelegatedTest method when `Rekey` is clicked', function () {
                component.slotDetail = testSlotDetail;
                component.category = "B+E" /* BE */;
                spyOn(component, 'showDelegatedExaminerRekeyButton').and.returnValue(true);
                spyOn(component, 'rekeyDelegatedTest');
                fixture.detectChanges();
                var rekeyDelegatedButton = fixture.debugElement.query(By.css('.mes-delegated-button'));
                rekeyDelegatedButton.triggerEventHandler('click', null);
                expect(component.rekeyDelegatedTest).toHaveBeenCalled();
            });
        });
        describe('debrief a test', function () {
            it('should call the resumeTest method when `Resume` is clicked', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Decided;
                fixture.detectChanges();
                spyOn(component, 'resumeTest');
                var debriefButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
                debriefButton.triggerEventHandler('click', null);
                expect(component.resumeTest).toHaveBeenCalled();
            });
        });
        describe('write up a test', function () {
            it('should call the writeUpTest method when `Write-up` is clicked', function () {
                component.testStatus = TestStatus.WriteUp;
                component.slotDetail = testSlotDetail;
                fixture.detectChanges();
                spyOn(component, 'writeUpTest');
                var writeUpButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
                writeUpButton.triggerEventHandler('click', null);
                expect(component.writeUpTest).toHaveBeenCalled();
            });
        });
        describe('resume a test', function () {
            it('should call the resumeTest method when `Resume` is clicked', function () {
                component.slotDetail = testSlotDetail;
                component.testStatus = TestStatus.Started;
                fixture.detectChanges();
                spyOn(component, 'resumeTest');
                var resumeButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
                resumeButton.triggerEventHandler('click', null);
                expect(component.resumeTest).toHaveBeenCalled();
            });
        });
        describe('rekey button', function () {
            it('should show rekey button', function () {
                spyOn(component, 'showRekeyButton').and.returnValue(true);
                fixture.detectChanges();
                var rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));
                expect(rekeyButton).not.toBeNull();
            });
            it('should hide rekey button', function () {
                spyOn(component, 'showRekeyButton').and.returnValue(false);
                fixture.detectChanges();
                var rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));
                expect(rekeyButton).toBeNull();
            });
        });
        describe('rekey modal', function () {
            it('should display the rekey modal for a test today that has ended', function () {
                component.slotDetail = testSlotDetail;
                var dateTime = new DateTime();
                dateTime.subtract(2, Duration.HOUR);
                component.slotDetail.start = dateTime.toString();
                component.testStatus = TestStatus.Booked;
                spyOn(component, 'displayRekeyModal');
                fixture.detectChanges();
                var startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
                startButton.triggerEventHandler('click', null);
                expect(component.displayRekeyModal).toHaveBeenCalled();
            });
            describe('showOutcome (DOM)', function () {
                it('should display the activity code if one is available', function () {
                    component.slotDetail = testSlotDetail;
                    component.testStatus = TestStatus.Submitted;
                    fixture.detectChanges();
                    var outcomeCode = fixture.debugElement.query(By.css('.outcome'));
                    expect(outcomeCode).not.toBeNull();
                });
                it('should hide the activity code if none available', function () {
                    component.slotDetail = testSlotDetail;
                    component.slotDetail.slotId = null;
                    fixture.detectChanges();
                    var outcomeCode = fixture.debugElement.query(By.css('.outcome'));
                    expect(outcomeCode).toBeNull();
                });
            });
            describe('show force detail check modal', function () {
                it('should display the force detail check modal', function () {
                    component.specialRequirements = true;
                    component.slotDetail = testSlotDetail;
                    component.testStatus = TestStatus.Booked;
                    component.hasSeenCandidateDetails = false;
                    spyOn(component, 'displayForceCheckModal');
                    fixture.detectChanges();
                    var startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
                    startButton.triggerEventHandler('click', null);
                    expect(component.displayForceCheckModal).toHaveBeenCalled();
                });
            });
            describe('candidate details seen, force detail check modal should not be seen', function () {
                it('should not display the force detail check modal', function () {
                    component.specialRequirements = true;
                    component.slotDetail = testSlotDetail;
                    component.testStatus = TestStatus.Booked;
                    component.slotDetail.slotId = 123456;
                    component.hasSeenCandidateDetails = true;
                    spyOn(component, 'displayForceCheckModal');
                    fixture.detectChanges();
                    var startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
                    startButton.triggerEventHandler('click', null);
                    expect(component.displayForceCheckModal).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});
//# sourceMappingURL=test-outcome.spec.js.map