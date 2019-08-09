import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { EtaInvalidModal } from '../eta-invalid-modal';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../../components/common/common.components.module';

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
        ComponentsModule,
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
