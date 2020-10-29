import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TestFinalisationInvalidTestDataModal } from '../test-finalisation-invalid-test-data-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';

describe('TestFinalisationInvalidTestDataModal', () => {
  let fixture: ComponentFixture<TestFinalisationInvalidTestDataModal>;
  let component: TestFinalisationInvalidTestDataModal;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFinalisationInvalidTestDataModal,
      ],
      imports: [
        AppModule,
        IonicModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestFinalisationInvalidTestDataModal);
    component = fixture.componentInstance;
    component.onReturnToTestReport = () => {};
    component.onCancel = () => {};
  }));

  describe('DOM', () => {
    it('should call onReturnToTestReport when the Continue to debrief button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onReturnToTestReport');
      const button = fixture.debugElement.query(By.css('button.mes-primary-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onReturnToTestReport).toHaveBeenCalled();
    });

    it('should call onCancel when the Return to test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('button.return-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });
  });
});
