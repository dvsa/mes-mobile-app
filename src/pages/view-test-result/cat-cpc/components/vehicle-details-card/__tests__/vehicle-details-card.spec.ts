import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CPCVehicleDetailsCardComponent } from '../vehicle-details-card';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../../../components/common/common-components.module';

describe('CPCVehicleDetailsCardComponent', () => {
  let fixture: ComponentFixture<CPCVehicleDetailsCardComponent>;
  let component: CPCVehicleDetailsCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CPCVehicleDetailsCardComponent,
      ],
      imports: [IonicModule, AppModule, ComponentsModule],
      providers: [],
    });
  });
  beforeEach(async(() => {
    fixture = TestBed.createComponent(CPCVehicleDetailsCardComponent);
    component = fixture.componentInstance;
  }));
  describe('Class', () => {
    it('should return N/A with no configuration provided', () => {
      component.vehicleDetails = {
        configuration: null,
        gearboxCategory: null,
        registrationNumber: null,
      };
      expect(component.getConfiguration()).toEqual('N/A');
    });
    it('should not return N/A if configuration is set', () => {
      component.vehicleDetails = {
        configuration: 'Rigid',
        gearboxCategory: null,
        registrationNumber: null,
      };
      expect(component.getConfiguration()).toEqual('Rigid');
    });
  });
});
