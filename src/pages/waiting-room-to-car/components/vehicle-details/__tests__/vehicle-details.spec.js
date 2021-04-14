import { async, TestBed } from '@angular/core/testing';
import { VehicleDetailsComponent } from '../vehicle-details';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleDetailsComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleDetailsComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleDetailsComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('DOM', function () {
        describe('setting optional vehicle details', function () {
            it('should call vehicleDetailsChanged when school car is selected', function () {
                spyOn(component, 'vehicleDetailsChanged');
                component.vehicleDetailsType = 'School car';
                component.ngOnChanges();
                fixture.detectChanges();
                var schoolCarCb = fixture.debugElement.query(By.css("#" + component.formControlName));
                schoolCarCb.triggerEventHandler('change', { target: {} });
                fixture.detectChanges();
                expect(component.vehicleDetailsChanged).toHaveBeenCalled();
            });
            it('should call vehicleDetailsChanged when dual controls is selected', function () {
                spyOn(component, 'vehicleDetailsChanged');
                component.vehicleDetailsType = 'Dual control';
                component.ngOnChanges();
                fixture.detectChanges();
                var dualControlCb = fixture.debugElement.query(By.css("#" + component.formControlName));
                dualControlCb.triggerEventHandler('change', { target: {} });
                fixture.detectChanges();
                expect(component.vehicleDetailsChanged).toHaveBeenCalled();
            });
        });
    });
});
//# sourceMappingURL=vehicle-details.spec.js.map