
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
  });

  describe('DOM', () => {

  });
});
