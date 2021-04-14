import { async, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { TrainerRegistrationNumberCatAdiPart2Component } from '../trainer-registration-number.cat-adi-part2';
import { mockBlankTrainerRegNumber, mockInvalidTrainerRegNumber, mockLeadingZeroTrainerRegNumber, mockOnlyZeroTrainerRegNumber, mockValidTrainerRegNumber, } from './trainer-registration-number.mock';
describe('TrainerRegistrationNumberCatAdiPart2Component', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TrainerRegistrationNumberCatAdiPart2Component,
            ],
            imports: [
                IonicModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TrainerRegistrationNumberCatAdiPart2Component);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.formControl = new FormControl(null);
    }));
    describe('vehicleRegistrationChanged', function () {
        beforeEach(function () {
            spyOn(component.trainerRegistrationChange, 'emit');
        });
        it('should recognise a valid numeric string and emit the value as a number', function () {
            component.trainerRegistrationChanged(mockValidTrainerRegNumber);
            expect(component.trainerRegistrationChange.emit).toHaveBeenCalledWith(1234567);
        });
        it('should remove non-numeric characters and emit the value as number', function () {
            component.trainerRegistrationChanged(mockInvalidTrainerRegNumber);
            expect(component.trainerRegistrationChange.emit).toHaveBeenCalledWith(12457);
        });
        it('should remove preceding zeros and emit rest of valid result', function () {
            component.trainerRegistrationChanged(mockLeadingZeroTrainerRegNumber);
            expect(component.trainerRegistrationChange.emit).toHaveBeenCalledWith(4567);
        });
        it('should remove preceding zeros and emit undefined as empty', function () {
            component.trainerRegistrationChanged(mockOnlyZeroTrainerRegNumber);
            expect(component.trainerRegistrationChange.emit).toHaveBeenCalledWith(undefined);
        });
        it('should emit undefined as the value can`t be cast to a number', function () {
            component.trainerRegistrationChanged(mockBlankTrainerRegNumber);
            expect(component.trainerRegistrationChange.emit).toHaveBeenCalledWith(undefined);
        });
    });
});
//# sourceMappingURL=trainer-registration-number.cat-adi-part2.spec.js.map