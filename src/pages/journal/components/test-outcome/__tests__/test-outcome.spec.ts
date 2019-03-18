import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestOutcomeComponent } from '../test-outcome';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store , StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { NavControllerMock } from 'ionic-mocks';
import { AnalyticsProviderMock } from '../../../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';
import { TestOutcomeStartTest } from '../test-outcome.actions';

describe('Test Outcome', () => {
  let fixture: ComponentFixture<TestOutcomeComponent>;
  let component: TestOutcomeComponent;
  let store$: Store<StoreModel>;

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
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');

  }));

  fdescribe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('startTest', () => {
      it('should dispatch a start test action with the slot ID', () => {
        component.slot = { slotDetail: { slotId: '123' } };
        component.startTest();
        expect(store$.dispatch).toHaveBeenCalledWith(new TestOutcomeStartTest('123'));
      });
    });
  });

  describe('DOM', () => {

    describe('show start test button', () => {
      it('should show the start test button when there is no outcome and user can not submit test', () => {
        component.canSubmitTest = false;
        component.outcome = undefined;
        fixture.detectChanges();
        const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
        expect(startButton.length).toBe(1);
      });

      it('should not show the start test button when the test has an outcome', () => {
        component.outcome = '12345';
        component.canSubmitTest = false;
        fixture.detectChanges();
        const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
        expect(startButton.length).toBe(0);
      });
      it('should not show start test button when the user can submit the test', () => {
        component.outcome = undefined;
        component.canSubmitTest = true;
        fixture.detectChanges();
        const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
        expect(startButton.length).toBe(0);
      });
    });

    describe('show submit test button', () => {
      it('should show submit test button when canSubmitTest is true', () => {
        component.canSubmitTest = true;
        fixture.detectChanges();
        const submitButton = fixture.debugElement.queryAll(By.css('.mes-secondary-button'));
        expect(submitButton.length).toBe(1);
      });

      it('should not show submit test button when canSubmitTest is false', () => {
        component.canSubmitTest = false;
        fixture.detectChanges();
        const submitButton = fixture.debugElement.queryAll(By.css('.mes-secondary-button'));
        expect(submitButton.length).toBe(0);
      });
    });

    describe('show outcome', () => {
      it('should show activity code when an outcome is provided', () => {
        component.outcome = '1234';
        fixture.detectChanges();
        const outcome = fixture.debugElement.queryAll(By.css('.outcome'));
        expect(outcome.length) .toBe(1);
      });

      it('should not show activity code when an outcome is not provided', () => {
        component.outcome = undefined;
        fixture.detectChanges();
        const outcome = fixture.debugElement.queryAll(By.css('.outcome'));
        expect(outcome.length).toBe(0);
      });

    });

  });
});
