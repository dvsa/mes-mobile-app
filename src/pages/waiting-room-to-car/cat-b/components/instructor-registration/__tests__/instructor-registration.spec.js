import { async, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { InstructorRegistrationComponent } from '../instructor-registration';
import { mockBlankInstructorRegistrationNumber, mockInvalidInstructorRegistrationNumber, mockLeadingZeroRegistrationNumber, mockOnlyZeroRegistrationNumber, mockValidInstructorRegistrationNumber, } from './instructor-registration.mock';
describe('InstructorRegistrationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                InstructorRegistrationComponent,
            ],
            imports: [
                IonicModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(InstructorRegistrationComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.formControl = new FormControl(null);
    }));
    describe('vehicleRegistrationChanged', function () {
        beforeEach(function () {
            spyOn(component.instructorRegistrationChange, 'emit');
        });
        it('should recognise a valid numeric string and emit the value as a number', function () {
            component.instructorRegistrationChanged(mockValidInstructorRegistrationNumber);
            expect(component.instructorRegistrationChange.emit).toHaveBeenCalledWith(1234567);
        });
        it('should remove non-numeric characters and emit the value as number', function () {
            component.instructorRegistrationChanged(mockInvalidInstructorRegistrationNumber);
            expect(component.instructorRegistrationChange.emit).toHaveBeenCalledWith(12457);
        });
        it('should remove preceding zeros and emit rest of valid result', function () {
            component.instructorRegistrationChanged(mockLeadingZeroRegistrationNumber);
            expect(component.instructorRegistrationChange.emit).toHaveBeenCalledWith(4567);
        });
        it('should remove preceding zeros and emit undefined as empty', function () {
            component.instructorRegistrationChanged(mockOnlyZeroRegistrationNumber);
            expect(component.instructorRegistrationChange.emit).toHaveBeenCalledWith(undefined);
        });
        it('should emit undefined as the value can`t be cast to a number', function () {
            component.instructorRegistrationChanged(mockBlankInstructorRegistrationNumber);
            expect(component.instructorRegistrationChange.emit).toHaveBeenCalledWith(undefined);
        });
    });
});
//# sourceMappingURL=instructor-registration.spec.js.map