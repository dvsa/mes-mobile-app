import { JournalForceCheckModal } from './journal-force-check-modal';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../app/app.module';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import {
  ModalAlertTitleComponent,
} from '../../test-report/components/test-report-modal/modal-alert-title/modal-alert-title';

describe('JournalForceCheckModal', () => {
  let fixture: ComponentFixture<JournalForceCheckModal>;
  let component: JournalForceCheckModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalForceCheckModal,
        ModalAlertTitleComponent,
      ],
      imports: [
        AppModule,
        IonicModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalForceCheckModal);
        component = fixture.componentInstance;
        component.onCancel = () => { };
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should call onCancel when the Cancel button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('button.force-check-return-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });
  });
});
