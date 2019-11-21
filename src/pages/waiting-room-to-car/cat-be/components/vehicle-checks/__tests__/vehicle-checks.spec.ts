
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController, Config } from 'ionic-angular';
import { ModalControllerMock, ConfigMock } from 'ionic-mocks';
import { VehicleChecksCatBEComponent } from '../vehicle-checks';
import { CAT_BE } from '../../../../../page-names.constants';
import { App } from '../../../../../../app/app.component';
import { Store } from '@ngrx/store';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { SeriousFaultBadgeComponent }
  from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DrivingFaultsBadgeComponent }
  from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';

class MockStore { }

describe('VehicleChecksCatBEComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCatBEComponent>;
  let component: VehicleChecksCatBEComponent;
  let modalController: ModalController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCatBEComponent,
        SeriousFaultBadgeComponent,
        DrivingFaultsBadgeComponent,
        TickIndicatorComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: App, useClass: MockAppComponent },
        { provide: Store, useClass: MockStore },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCatBEComponent);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
      });
  }));

  describe('Class', () => {
    describe('isInvalid', () => {
      it('should return the correct value', () => {
        expect(component.isInvalid()).toEqual(false);
      });
    });

    describe('openVehicleChecksModal', () => {
      it('should create the correct model', () => {
        component.openVehicleChecksModal();
        expect(modalController.create).toHaveBeenCalledTimes(1);
        expect(modalController.create).toHaveBeenCalledWith(
          CAT_BE.VEHICLE_CHECKS_MODAL,
          {},
          { cssClass: 'modal-fullscreen text-zoom-regular' },
        );
      });
    });

    describe('hasSeriousFault', () => {
      it('should return true if vehicle checks score has serious fault', () => {
        component.vehicleChecksScore = {
          seriousFaults: 1,
          drivingFaults: 4,
        };

        expect(component.hasSeriousFault()).toBeTruthy();
      });

      it('should return false if vehicle checks score does not have serious fault', () => {
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 3,
        };

        expect(component.hasSeriousFault()).toBeFalsy();
      });
    });

    describe('hasDrivingFault', () => {
      it('should return true if vehicle checks score has driving fault', () => {
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 1,
        };

        expect(component.hasDrivingFault()).toBeTruthy();
      });

      it('should return false if vehicle checks score does not have driving fault', () => {
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 0,
        };

        expect(component.hasDrivingFault()).toBeFalsy();
      });
    });

    describe('everyQuestionHasOutcome', () => {
      it('should return false when not all show me and tell me questions have outcome', () => {
        component.vehicleChecks = {
          showMeQuestions: [{}, {}, {}],
          tellMeQuestions: [{}, {}],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return false when not all show me questions have outcome', () => {
        component.vehicleChecks = {
          showMeQuestions: [{}, {}, {}],
          tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return false when not all tell me questions have outcome', () => {
        component.vehicleChecks = {
          showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
          tellMeQuestions: [{}, {}],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return true when all show / tell me questions have outcome', () => {
        component.vehicleChecks = {
          showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
          tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
        };

        expect(component.everyQuestionHasOutcome()).toBeTruthy();
      });
    });
  });

  describe('DOM', () => {

  });
});
