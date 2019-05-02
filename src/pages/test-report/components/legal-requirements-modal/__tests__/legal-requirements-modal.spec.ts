import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { LegalRequirementsModal } from '../legal-requirements-modal';
import { IonicModule, NavParams } from 'ionic-angular';
import { NavParamsMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';

describe('LegalRequirementsModal', () => {
  let fixture: ComponentFixture<LegalRequirementsModal>;
  let component: LegalRequirementsModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LegalRequirementsModal,
      ],
      imports: [
        AppModule,
        IonicModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LegalRequirementsModal);
        component = fixture.componentInstance;
        component.onCancel = () => {};
        component.onTerminate = () => {};
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
});
