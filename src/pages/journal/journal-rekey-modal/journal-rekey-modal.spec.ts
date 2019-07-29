import { JournalRekeyModal } from './journal-rekey-modal';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../app/app.module';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../components/components.module';

describe('JournalRekeyModal', () => {
  let fixture: ComponentFixture<JournalRekeyModal>;
  let component: JournalRekeyModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalRekeyModal,
      ],
      imports: [
        AppModule,
        IonicModule,
        ComponentsModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalRekeyModal);
        component = fixture.componentInstance;
        component.onStartTest = () => { };
        component.onRekeyTest = () => { };
        component.onCancel = () => { };
      });
  }));

  describe('DOM', () => {
    it('should call onStartTest when the Start test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onStartTest');
      const button = fixture.debugElement.query(By.css('button.start-test-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onStartTest).toHaveBeenCalled();
    });

    it('should call onRekeyTest when the Rekey a paper test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onRekeyTest');
      const button = fixture.debugElement.query(By.css('button.rekey-test-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onRekeyTest).toHaveBeenCalled();
    });

    it('should call onCancel when the Cancel button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('button.cancel-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });
  });
});
