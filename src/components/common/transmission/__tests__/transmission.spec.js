import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { TransmissionComponent } from '../transmission';
import { TransmissionType } from '../../../../shared/models/transmission-type';
import { configureTestSuite } from 'ng-bullet';
describe('transmissionComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TransmissionComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TransmissionComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('Class', function () {
        describe('TransmissionChanged', function () {
            it('should emit manual if manual transmission selected', function () {
                spyOn(component.transmissionChange, 'emit');
                var transmission = TransmissionType.Manual;
                component.transmissionChanged(transmission);
                expect(component.transmissionChange.emit).toHaveBeenCalledWith(transmission);
            });
            it('should emit automatic if automatic transmission selected', function () {
                spyOn(component.transmissionChange, 'emit');
                var transmission = TransmissionType.Automatic;
                component.transmissionChanged(transmission);
                expect(component.transmissionChange.emit).toHaveBeenCalledWith(transmission);
            });
        });
        describe('isInvalid', function () {
            it('should validate the field when it is valid', function () {
                component.ngOnChanges();
                component.formGroup.get(TransmissionComponent.fieldName).setValue(TransmissionType.Manual);
                fixture.detectChanges();
                var result = component.isInvalid();
                expect(result).toEqual(false);
            });
            it('should not validate the field when it is dirty', function () {
                component.ngOnChanges();
                component.formControl.markAsDirty();
                fixture.detectChanges();
                var result = component.isInvalid();
                expect(result).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=transmission.spec.js.map