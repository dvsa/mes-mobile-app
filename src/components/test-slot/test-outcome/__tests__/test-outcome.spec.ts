import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestOutcomeComponent } from '../test-outcome';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { NavControllerMock } from 'ionic-mocks';
import { StartTest, ActivateTest } from '../../../../modules/tests/tests.actions';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { CAT_B, CAT_BE } from '../../../../pages/page-names.constants';
import { DateTime, Duration } from '../../../../shared/helpers/date-time';
import { SlotDetail } from '@dvsa/mes-journal-schema';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { JournalModel } from '../../../../modules/journal/journal.model';
import { LogHelper } from '../../../../providers/logs/logsHelper';
import { LogHelperMock } from '../../../../providers/logs/__mocks__/logsHelper.mock';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

describe('Test Outcome', () => {
  let fixture: ComponentFixture<TestOutcomeComponent>;
  let component: TestOutcomeComponent;
  let store$: Store<StoreModel>;
  let navController: NavController;

  const testSlotDetail: SlotDetail = {
    duration: 57,
    slotId: 123,
    start: new DateTime().toString(),
  };

  const journal: JournalModel = {
    isLoading: false,
    lastRefreshed: new Date(),
    slots: {},
    selectedDate: 'dummy',
    examiner: { staffNumber: '123', individualId: 456 },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestOutcomeComponent],
      imports: [
        IonicModule.forRoot(TestOutcomeComponent),
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {},
            testStatus: {},
            startedTests: {
              1234: {
                category: 'B',
                activityCode: ActivityCodes.BAD_LIGHT,
                journalData: {
                },
                rekey: false,
              },
            },
          }),
          journal: () => (journal),
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: LogHelper, useClass: LogHelperMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestOutcomeComponent);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('startTest', () => {
      it('should dispatch a start test action with the slot', () => {
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.B;
        component.startTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new StartTest(component.slotDetail.slotId, component.category));
      });
    });

    describe('writeUpTest', () => {
      it('should dispatch an ActivateTest action and navigate to the Office Cat B page', () => {
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.B;
        component.writeUpTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, component.category));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.OFFICE_PAGE);
      });
      it('should dispatch an ActivateTest action and navigate to the Office Cat BE page', () => {
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.BE;
        component.writeUpTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, component.category));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_BE.OFFICE_PAGE);
      });
    });

    describe('resumeTest', () => {
      it('should dispatch an ActivateTest action and navigate to the Waiting Room page', () => {
        component.testStatus = TestStatus.Started;
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.B;
        component.resumeTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, component.category));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.WAITING_ROOM_PAGE);
      });
      it('should dispatch an ActivateTest action and navigate to the Pass Finalisation page', () => {
        component.testStatus = TestStatus.Decided;
        component.slotDetail = testSlotDetail;
        component.activityCode = ActivityCodes.PASS;
        component.category = TestCategory.B;
        component.resumeTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, component.category));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.PASS_FINALISATION_PAGE);
      });
      it('should dispatch an ActivateTest action and navigate to the Non Pass Finalisation page', () => {
        component.testStatus = TestStatus.Decided;
        component.slotDetail = testSlotDetail;
        component.activityCode = ActivityCodes.FAIL;
        component.category = TestCategory.B;
        component.resumeTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId, component.category));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.NON_PASS_FINALISATION_PAGE);
      });
    });

    describe('showRekeyButton', () => {
      it('should return false for a completed test', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Completed;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(false);
      });
      it('should return true for a booked test on the rekey search page', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Booked;
        component.isTestSlotOnRekeySearch = true;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(true);
      });
      it('should return false for a completed test on the rekey search page', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Completed;
        component.isTestSlotOnRekeySearch = true;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(false);
      });
      it('should return true for a test that was started as a rekey and the date is in the past', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Started;
        component.isRekey = true;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(true);
      });
      it('should return false for test that was started as a rekey and the date is today', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Started;
        component.isRekey = true;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(false);
      });
      it('should return true for a new test if date is in past', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);
        component.slotDetail.start = dateTime.toString();
        component.testStatus = null;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(true);
      });
      it('should return true for a booked test if date is in past', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Booked;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(true);
      });
      it('should return false for a resumed test if date is in past', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Started;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(false);
      });
      it('should return true for a booked test if date is in the past', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Booked;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(true);
      });
      it('should return false for a booked test if date is today', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Booked;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(false);
      });
      it('should return false for a resumed test if date is today', () => {
        component.slotDetail = testSlotDetail;
        const dateTime = new DateTime();
        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Started;

        component.showRekeyButton();

        expect(component.showRekeyButton()).toEqual(false);
      });
    });
    describe('getTestStartingPage', () => {
      it('should return the correct value for a Category B Test', () => {
        component.category = TestCategory.B;
        expect(component.getTestStartingPage()).toEqual(CAT_B.WAITING_ROOM_PAGE);
      });
      it('should return the correct value for a Category B+E Test', () => {
        component.category = TestCategory.BE;
        expect(component.getTestStartingPage()).toEqual(CAT_BE.WAITING_ROOM_PAGE);
      });
    });
    describe('getPassFinalisationPage', () => {
      it('should return the correct value for a Category B Test', () => {
        component.category = TestCategory.B;
        expect(component.getPassFinalisationPage()).toEqual(CAT_B.PASS_FINALISATION_PAGE);
      });
      it('should return the correct value for a Category B+E Test', () => {
        component.category = TestCategory.BE;
        expect(component.getPassFinalisationPage()).toEqual(CAT_BE.PASS_FINALISATION_PAGE);
      });
    });
    describe('getPassFinalisationPage', () => {
      it('should return the correct value for a Category B Test', () => {
        component.category = TestCategory.B;
        expect(component.getNonPassFinalisationPage()).toEqual(CAT_B.NON_PASS_FINALISATION_PAGE);
      });
      it('should return the correct value for a Category B+E Test', () => {
        component.category = TestCategory.BE;
        expect(component.getNonPassFinalisationPage()).toEqual(CAT_BE.NON_PASS_FINALISATION_PAGE);
      });
    });
  });

  describe('DOM', () => {

    describe('show start test button', () => {
      it('should show the start test button when the test status is Booked', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Booked;
        fixture.detectChanges();
        const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
        expect(startButton.length).toBe(1);
      });

      it('should not show the start test button when the test has a status other than booked', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Started;
        fixture.detectChanges();
        const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
        expect(startButton.length).toBe(0);
      });
    });

    describe('start a test', () => {
      it('should call the startTest method when `Start test` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Booked;
        fixture.detectChanges();
        spyOn(component, 'startTest');

        const startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
        startButton.triggerEventHandler('click', null);

        expect(component.startTest).toHaveBeenCalled();
      });
    });

    describe('rekey a test', () => {
      it('should call the rekeyTest method when `Rekey` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.B;
        component.testStatus = TestStatus.Booked;
        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);
        component.slotDetail.start = dateTime.toString();
        fixture.detectChanges();
        spyOn(component, 'rekeyTest');

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));
        rekeyButton.triggerEventHandler('click', null);

        expect(component.rekeyTest).toHaveBeenCalled();
      });

      it('should navigate to cat B waiting room page when `Rekey` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.B;
        component.rekeyTest();
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_B.WAITING_ROOM_PAGE);
      });

      it('should navigate to cat BE waiting room page when `Rekey` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.category = TestCategory.BE;
        component.rekeyTest();
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(CAT_BE.WAITING_ROOM_PAGE);
      });
    });

    describe('debrief a test', () => {
      it('should call the resumeTest method when `Resume` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Decided;
        fixture.detectChanges();
        spyOn(component, 'resumeTest');

        const debriefButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
        debriefButton.triggerEventHandler('click', null);

        expect(component.resumeTest).toHaveBeenCalled();
      });
    });

    describe('write up a test', () => {
      it('should call the writeUpTest method when `Write-up` is clicked', () => {
        component.testStatus = TestStatus.WriteUp;
        component.slotDetail = testSlotDetail;
        fixture.detectChanges();
        spyOn(component, 'writeUpTest');

        const writeUpButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
        writeUpButton.triggerEventHandler('click', null);

        expect(component.writeUpTest).toHaveBeenCalled();
      });
    });

    describe('resume a test', () => {
      it('should call the resumeTest method when `Resume` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Started;
        fixture.detectChanges();
        spyOn(component, 'resumeTest');

        const resumeButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
        resumeButton.triggerEventHandler('click', null);

        expect(component.resumeTest).toHaveBeenCalled();
      });
    });

    describe('rekey button', () => {
      it('should show rekey button', () => {
        spyOn(component, 'showRekeyButton').and.returnValue(true);
        fixture.detectChanges();

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));

        expect(rekeyButton).not.toBeNull();
      });
      it('should hide rekey button', () => {
        spyOn(component, 'showRekeyButton').and.returnValue(false);
        fixture.detectChanges();

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));

        expect(rekeyButton).toBeNull();
      });
    });

    describe('rekey modal', () => {
      it('should display the rekey modal for a test today that has ended', () => {
        component.slotDetail = testSlotDetail;

        const dateTime = new DateTime();
        dateTime.subtract(2, Duration.HOUR);

        component.slotDetail.start = dateTime.toString();
        component.testStatus = TestStatus.Booked;
        spyOn(component, 'displayRekeyModal');
        fixture.detectChanges();

        const startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
        startButton.triggerEventHandler('click', null);

        expect(component.displayRekeyModal).toHaveBeenCalled();
      });

      describe('showOutcome (DOM)', () => {
        it('should display the activity code if one is available', () => {
          component.slotDetail = testSlotDetail;
          component.testStatus = TestStatus.Submitted;
          fixture.detectChanges();
          const outcomeCode = fixture.debugElement.query(By.css('.outcome'));
          expect(outcomeCode).not.toBeNull();
        });
        it('should hide the activity code if none available', () => {
          component.slotDetail = testSlotDetail;
          component.slotDetail.slotId = null;
          fixture.detectChanges();
          const outcomeCode = fixture.debugElement.query(By.css('.outcome'));
          expect(outcomeCode).toBeNull();
        });
      });

      describe('show force detail check modal', () => {
        it('should display the force detail check modal', () => {
          component.specialRequirements = true;
          component.slotDetail = testSlotDetail;
          component.testStatus = TestStatus.Booked;
          component.hasSeenCandidateDetails = false;
          spyOn(component, 'displayForceCheckModal');
          fixture.detectChanges();

          const startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
          startButton.triggerEventHandler('click', null);

          expect(component.displayForceCheckModal).toHaveBeenCalled();
        });
      });

      describe('candidate details seen, force detail check modal should not be seen', () => {
        it('should not display the force detail check modal', () => {
          component.specialRequirements = true;
          component.slotDetail = testSlotDetail;
          component.testStatus = TestStatus.Booked;
          component.slotDetail.slotId = 123456;
          component.hasSeenCandidateDetails = true;
          spyOn(component, 'displayForceCheckModal');
          fixture.detectChanges();

          const startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
          startButton.triggerEventHandler('click', null);

          expect(component.displayForceCheckModal).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
