import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestOutcomeComponent } from '../test-outcome';
import { By } from '@angular/platform-browser';
import { NavControllerMock } from 'ionic-mocks';
import { AnalyticsProviderMock } from '../../../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';

describe('Test Outcome', () => {
  let fixture: ComponentFixture<TestOutcomeComponent>;
  let component: TestOutcomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestOutcomeComponent],
      imports: [IonicModule.forRoot(TestOutcomeComponent)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance },
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },

      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestOutcomeComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
    it('should show start test button when canStartTest is true', () => {
      component.canStartTest = true;
      fixture.detectChanges();
      const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
      expect(startButton.length).toBe(1);
    });

    it('should not show start test button when canStartTest is false', () => {
      component.canStartTest = false;
      fixture.detectChanges();
      const startButton = fixture.debugElement.queryAll(By.css('.mes-primary-button'));
      expect(startButton.length).toBe(0);
    });

    it('should show submit test button when canSubmitTest is true', () => {
      component.canSubmitTest = true;
      fixture.detectChanges();
      const submitButton = fixture.debugElement.queryAll(By.css('.mes-secondary-button'));
      expect(submitButton.length).toBe(1);
    });

    it('should show submit test button when canSubmitTest is false', () => {
      component.canSubmitTest = false;
      fixture.detectChanges();
      const submitButton = fixture.debugElement.queryAll(By.css('.mes-secondary-button'));
      expect(submitButton.length).toBe(0);
    });

    it('should show activity code when canSubmitTest and canStartTest are false', () => {
      component.canStartTest = false;
      component.canSubmitTest = false;
      fixture.detectChanges();
      const outcome = fixture.debugElement.queryAll(By.css('.outcome'));
      expect(outcome.length).toBe(1);
    });

    it('should not show activity code when canSubmitTest or canStartTest are true', () => {
      component.canStartTest = true;
      component.canSubmitTest = false;
      fixture.detectChanges();
      const outcome = fixture.debugElement.queryAll(By.css('.outcome'));
      expect(outcome.length).toBe(0);
    });
  });
});
