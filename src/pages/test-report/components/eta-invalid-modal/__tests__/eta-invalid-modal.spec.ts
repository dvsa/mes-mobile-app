import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { TestReportModalModule } from '../../test-report-modal.module';
import { EtaInvalidModal } from '../eta-invalid-modal';
import { By } from '@angular/platform-browser';

describe('LegalRequirementsModal', () => {
  let fixture: ComponentFixture<EtaInvalidModal>;
  let component: EtaInvalidModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EtaInvalidModal,
      ],
      imports: [
        AppModule,
        IonicModule,
        TestReportModalModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EtaInvalidModal);
        component = fixture.componentInstance;
        component.onCancel = () => {};
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should call onCancel when the Return to test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onCancel');
      const button = fixture.debugElement.query(By.css('button.modal-return-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalled();
    });
  });
});
