import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestOutcomeComponent } from '../test-outcome';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { NavControllerMock } from 'ionic-mocks';
import { AnalyticsProviderMock } from '../../../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';
import { StartTest, ActivateTest } from '../../../journal.actions';
import { TestStatus } from '../../../../../modules/tests/test-status/test-status.model';
import { OFFICE_PAGE, COMMUNICATION_PAGE } from '../../../../page-names.constants';
import { DateTime, Duration } from '../../../../../shared/helpers/date-time';

describe('Test Outcome', () => {
  let fixture: ComponentFixture<TestOutcomeComponent>;
  let component: TestOutcomeComponent;
  let store$: Store<StoreModel>;
  let navController: NavController;

  const testSlotDetail = {
    duration: 57,
    slotId: 123,
    start: new DateTime(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestOutcomeComponent],
      imports: [
        IonicModule.forRoot(TestOutcomeComponent),
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
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
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('startTest', () => {
      it('should dispatch a start test action with the slot', () => {
        component.slotDetail = testSlotDetail;
        component.startTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new StartTest(component.slotDetail.slotId));
      });
    });

    describe('writeUpTest', () => {
      it('should dispatch an ActivateTest action and navigate to the Office page', () => {
        component.slotDetail = testSlotDetail;
        component.writeUpTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(OFFICE_PAGE);
      });
    });

    describe('resumeTest', () => {
      it('should dispatch an ActivateTest action and navigate to the Office page', () => {
        component.slotDetail = testSlotDetail;
        component.resumeTest();

        expect(store$.dispatch).toHaveBeenCalledWith(new ActivateTest(component.slotDetail.slotId));
        const { calls } = navController.push as jasmine.Spy;
        expect(calls.argsFor(0)[0]).toBe(COMMUNICATION_PAGE);
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

    describe('show outcome', () => {
      it('should show activity code when an outcome is provided', () => {
        component.slotDetail = testSlotDetail;
        component.outcome = '1234';
        fixture.detectChanges();
        const outcome = fixture.debugElement.queryAll(By.css('.outcome'));
        expect(outcome.length).toBe(1);
      });

      it('should not show activity code when an outcome is not provided', () => {
        component.slotDetail = testSlotDetail;
        component.outcome = undefined;
        fixture.detectChanges();
        const outcome = fixture.debugElement.queryAll(By.css('.outcome'));
        expect(outcome.length).toBe(0);
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

    describe('debrief a test', () => {
      it('should call the debriefTest method when `Resume` is clicked', () => {
        component.slotDetail = testSlotDetail;
        component.testStatus = TestStatus.Decided;
        fixture.detectChanges();
        spyOn(component, 'debriefTest');

        const debriefButton = fixture.debugElement.query(By.css('.mes-secondary-button'));
        debriefButton.triggerEventHandler('click', null);

        expect(component.debriefTest).toHaveBeenCalled();
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

    describe('show rekey button', () => {
      it('should show rekey button for a booked test if date is in past', () => {
        component.slotDetail = testSlotDetail;

        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);

        component.slotDetail.start = dateTime;
        component.testStatus = TestStatus.Booked;
        fixture.detectChanges();

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));

        expect(rekeyButton).not.toBeNull();
      });
      it('should show rekey button for a resumed test if date is in past', () => {
        component.slotDetail = testSlotDetail;

        const dateTime = new DateTime();
        dateTime.subtract(1, Duration.DAY);

        component.slotDetail.start = dateTime;
        component.testStatus = TestStatus.Started;
        fixture.detectChanges();

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));

        expect(rekeyButton).not.toBeNull();
      });
      it('should hide rekey button for a booked test if date is today', () => {
        component.slotDetail = testSlotDetail;

        const dateTime = new DateTime();

        component.slotDetail.start = dateTime;
        component.testStatus = TestStatus.Booked;
        fixture.detectChanges();

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));

        expect(rekeyButton).toBeNull();
      });
      it('should hide rekey button for a resumed test if date is today', () => {
        component.slotDetail = testSlotDetail;

        const dateTime = new Date();

        component.slotDetail.start = dateTime;
        component.testStatus = TestStatus.Started;
        fixture.detectChanges();

        const rekeyButton = fixture.debugElement.query(By.css('.mes-rekey-button'));

        expect(rekeyButton).toBeNull();
      });
      it('should display the rekey modal for a test today that has ended', () => {
        component.slotDetail = testSlotDetail;

        const dateTime = new DateTime();
        dateTime.subtract(2, Duration.HOUR);

        component.slotDetail.start = dateTime;
        component.testStatus = TestStatus.Booked;
        spyOn(component, 'displayRekeyModal');
        fixture.detectChanges();

        const startButton = fixture.debugElement.query(By.css('.mes-primary-button'));
        startButton.triggerEventHandler('click', null);

        expect(component.displayRekeyModal).toHaveBeenCalled();
      });
    });
  });
});
