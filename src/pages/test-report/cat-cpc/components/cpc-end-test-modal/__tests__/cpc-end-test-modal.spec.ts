import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CPCEndTestModal } from '../cpc-end-test-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
import { ModalResultItemComponent } from '../components/modal-result-item/modal-result-item';
import { ModalEvent } from '../../../../test-report.constants';
import { ActivityCodes } from '../../../../../../shared/models/activity-codes';
import { TestOutcome } from '../../../../../../modules/tests/tests.constants';

describe('CPCEndTestModal', () => {
  let fixture: ComponentFixture<CPCEndTestModal>;
  let component: CPCEndTestModal;
  let viewController: ViewController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CPCEndTestModal,
        ModalResultItemComponent,
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
    fixture = TestBed.createComponent(CPCEndTestModal);
    component = fixture.componentInstance;
    viewController = TestBed.get(ViewController);
  }));

  describe('DOM', () => {
    it('should call onContinue when the Continue to debrief button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onContinue');
      const button = fixture.debugElement.query(By.css('button.mes-primary-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onContinue).toHaveBeenCalled();
    });

    it('should call onCancel when the Return to test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('button.return-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should call onTerminate when the Terminate test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onTerminate');
      const button = fixture.debugElement.query(By.css('button.terminate-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onTerminate).toHaveBeenCalled();
    });
  });

  describe('Class', () => {
    describe('onCancel', () => {
      it('should dismiss the view controller with cancel event', async() => {
        await component.onCancel();
        expect(viewController.dismiss).toHaveBeenCalledWith(ModalEvent.CANCEL);
      });
    });
    describe('onContinue', () => {
      it('should dismiss the view controller with continue event', async() => {
        await component.onContinue();
        expect(viewController.dismiss).toHaveBeenCalledWith(ModalEvent.CONTINUE);
      });
    });
    describe('onTerminate', () => {
      it('should dismiss the view controller with terminate event', async() => {
        await component.onTerminate();
        expect(viewController.dismiss).toHaveBeenCalledWith(ModalEvent.TERMINATE);
      });
    });
    describe('getTestResultLabel', () => {
      let label: string;
      it('should return the correct label for a pass', () => {
        component.testResult = ActivityCodes.PASS;
        label = component.getTestResultLabel();
        expect(label).toEqual(TestOutcome.Passed);
      });
      it('should return the correct label for a fail', () => {
        component.testResult = ActivityCodes.FAIL;
        label = component.getTestResultLabel();
        expect(label).toEqual(TestOutcome.Failed);
      });
    });
    describe('getTestResultClass', () => {
      let cssClass: string;
      it('should return the correct class for a pass', () => {
        component.testResult = ActivityCodes.PASS;
        cssClass = component.getTestResultClass();
        expect(cssClass).toEqual('test-result-pass-label');
      });
      it('should return the correct class for a fail', () => {
        component.testResult = ActivityCodes.FAIL;
        cssClass = component.getTestResultClass();
        expect(cssClass).toEqual('test-result-fail-label');
      });
    });
  });

});
