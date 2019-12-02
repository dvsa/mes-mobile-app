import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { PracticeTestModal } from '../practice-test-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';

describe('PracticeTestModal', () => {
  let fixture: ComponentFixture<PracticeTestModal>;
  let component: PracticeTestModal;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PracticeTestModal,
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
        fixture = TestBed.createComponent(PracticeTestModal);
        component = fixture.componentInstance;
        component.onCancel = () => {};
        component.onNoFault = () => {};
        component.onFault = () => {};
  }));

  describe('DOM', () => {
    it('should call onCancel when the Return to test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('button.cancel-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should call onNoFault when the start without any faults button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onNoFault');
      const button = fixture.debugElement.query(By.css('button.no-fault-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onNoFault).toHaveBeenCalled();
    });

    it('should call onFault when the start with a fault button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onFault');
      const button = fixture.debugElement.query(By.css('button.fault-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onFault).toHaveBeenCalled();
    });
  });
});
