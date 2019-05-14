
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleDetailsComponent } from '../vehicle-details';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

describe('VehicleDetailsComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsComponent>;
  let component: VehicleDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleDetailsComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
      });

  }));

  describe('DOM', () => {
    describe('setting optional vehicle details', () => {
      it('should call vehicleDetailsChanged when school car is selected', () => {
        spyOn(component, 'vehicleDetailsChanged');
        component.vehicleDetailsType = 'School car';
        component.ngOnChanges();
        fixture.detectChanges();
        const schoolCarCb = fixture.debugElement.query(By.css(`#${component.formControlName}`));
        schoolCarCb.triggerEventHandler('change', { target: {} });
        fixture.detectChanges();
        expect(component.vehicleDetailsChanged).toHaveBeenCalled();
      });
      it('should call vehicleDetailsChanged when dual controls is selected', () => {
        spyOn(component, 'vehicleDetailsChanged');
        component.vehicleDetailsType = 'Dual control';
        component.ngOnChanges();
        fixture.detectChanges();
        const dualControlCb = fixture.debugElement.query(By.css(`#${component.formControlName}`));
        dualControlCb.triggerEventHandler('change', { target: {} });
        fixture.detectChanges();
        expect(component.vehicleDetailsChanged).toHaveBeenCalled();
      });
    });
  });
});
