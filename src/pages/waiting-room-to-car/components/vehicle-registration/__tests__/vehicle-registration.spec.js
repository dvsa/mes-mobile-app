import { async, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { VehicleRegistrationComponent } from '../vehicle-registration';
import { AppModule } from '../../../../../app/app.module';
import { mockBlankRegistrationNumber, mockInvalidRegistrationNumber, mockValidRegistrationNumber, } from './vehicle-registration.mock';
describe('VehicleRegistrationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleRegistrationComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleRegistrationComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.formControl = new FormControl(null, [Validators.required]);
    }));
    describe('vehicleRegistrationChanged', function () {
        beforeEach(function () {
            spyOn(component.vehicleRegistrationChange, 'emit');
            spyOn(component.formControl, 'setErrors');
        });
        it('should recognise a valid alphanumeric string and emit the value in uppercase', function () {
            component.vehicleRegistrationChanged(mockValidRegistrationNumber);
            expect(component.formControl.setErrors).not.toHaveBeenCalled();
            expect(component.vehicleRegistrationChange.emit).toHaveBeenCalledWith('ABC123');
        });
        it('should remove non-alphanumeric characters and emit the value in uppercase', function () {
            component.vehicleRegistrationChanged(mockInvalidRegistrationNumber);
            expect(component.formControl.setErrors).not.toHaveBeenCalled();
            expect(component.vehicleRegistrationChange.emit).toHaveBeenCalledWith('DEF23');
        });
        it('should set an error on form control as the field value is dirty and non compliant', function () {
            component.vehicleRegistrationChanged(mockBlankRegistrationNumber);
            expect(component.formControl.setErrors).toHaveBeenCalledWith({ invalidValue: '' });
            expect(component.vehicleRegistrationChange.emit).toHaveBeenCalledWith('');
        });
    });
});
//# sourceMappingURL=vehicle-registration.spec.js.map