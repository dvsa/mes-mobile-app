import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { LegalRequirementsModal } from '../legal-requirements-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { TestReportModalModule } from '../../test-report-modal/test-report-modal.module';

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
        TestReportModalModule,
      ],
      providers: [
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LegalRequirementsModal);
        component = fixture.componentInstance;
        component.onCancel = () => {};
        component.onTerminate = () => {};
        component.legalRequirements = {
          normalStart1: false,
          normalStart2: false,
          angledStart: false,
          hillStart: false,
          eco: false,
          manoeuvre: false,
          vehicleChecks: false,
        };
      });
  }));

  describe('Class', () => {
    describe('getLegalRequirementsText', () => {
      it('should return an array of length 6', () => {
        const legalRequirements = component.getLegalRequirementsText();
        expect(legalRequirements.length).toBe(6);
      });
      it('should return an array with the correct text for 6 requirements', () => {
        const legalRequirements = component.getLegalRequirementsText();
        expect(legalRequirements).toContain('NS (normal start)');
        expect(legalRequirements).toContain('AS (angled start)');
        expect(legalRequirements).toContain('HS / DS (hill or designated start)');
        expect(legalRequirements).toContain('Manoeuvres');
        expect(legalRequirements).toContain('Eco (control and planning)');
        expect(legalRequirements).toContain('Show me / Tell me');
      });

      it('should return an array of length 3', () => {
        component.legalRequirements = {
          normalStart1: true,
          normalStart2: false,
          angledStart: true,
          hillStart: false,
          eco: true,
          manoeuvre: false,
          vehicleChecks: true,
        };
        fixture.detectChanges();

        const legalRequirements = component.getLegalRequirementsText();
        expect(legalRequirements.length).toBe(3);
      });
      it('should return an array with the correct text', () => {
        component.legalRequirements = {
          normalStart1: true,
          normalStart2: false,
          angledStart: true,
          hillStart: false,
          eco: true,
          manoeuvre: false,
          vehicleChecks: true,
        };
        fixture.detectChanges();

        const legalRequirements = component.getLegalRequirementsText();
        expect(legalRequirements).toContain('NS (normal start)');
        expect(legalRequirements).toContain('HS / DS (hill or designated start)');
        expect(legalRequirements).toContain('Manoeuvres');
      });
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

    it('should call onTerminate when the Terminate test button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onTerminate');
      const button = fixture.debugElement.query(By.css('button.terminate-button'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.onTerminate).toHaveBeenCalled();
    });
    it('should display the correct text when normal start has not been completed', () => {
      component.legalRequirements = {
        normalStart1: true,
        normalStart2: false,
        angledStart: true,
        hillStart: true,
        eco: true,
        manoeuvre: true,
        vehicleChecks: true,
      };
      fixture.detectChanges();
      const listItem: HTMLElement = fixture.debugElement.query(By.css('li')).nativeElement;
      expect(listItem.textContent).toEqual('NS (normal start)');
    });
  });
});
