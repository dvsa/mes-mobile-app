import { PassCertificateNumberComponent } from '../pass-certificate-number';
import { PassCertificateValidationProvider, } from '../../../../../providers/pass-certificate-validation/pass-certificate-validation';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('passCertificateNumberComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PassCertificateNumberComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                PassCertificateValidationProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PassCertificateNumberComponent);
        component = fixture.componentInstance;
        component.form = new FormGroup({});
    }));
    describe('Class', function () {
        describe('passCertificateNumberChanged', function () {
            it('should emit pass certificate number if 8 characters and valid', function () {
                spyOn(component.passCertificateNumberChange, 'emit');
                var passCertificateNumber = 'C267548E';
                component.passCertificateNumberChanged(passCertificateNumber);
                expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
            });
        });
        describe('isInvalid', function () {
            it('should return false when the field is valid and not dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.setValue('C267548E');
                // ACT
                var result = component.isInvalid();
                // ASSET
                expect(component.formControl.dirty).toEqual(false);
                expect(!component.formControl.valid).toEqual(false);
                expect(result).toEqual(false);
            });
            it('should return false when the field is not valid and is not dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.setValue('1');
                // ACT
                var result = component.isInvalid();
                // ASSET
                expect(component.formControl.dirty).toEqual(false);
                expect(!component.formControl.valid).toEqual(true);
                expect(result).toEqual(false);
            });
            it('should return false when the field is valid and is dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.setValue('C267548E');
                component.formControl.markAsDirty();
                // ACT
                var result = component.isInvalid();
                // ASSET
                expect(component.formControl.dirty).toEqual(true);
                expect(!component.formControl.valid).toEqual(false);
                expect(result).toEqual(false);
            });
            it('should return true if the field is empty and is marked as dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.markAsDirty();
                // ACT
                var result = component.isInvalid();
                // ASSERT
                expect(component.formControl.dirty).toEqual(true);
                expect(!component.formControl.valid).toEqual(true);
                expect(result).toEqual(true);
            });
            it('should return true if the field has less then 8 characters and is marked as dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.setValue('1');
                component.formControl.markAsDirty();
                // ACT
                var result = component.isInvalid();
                // ASSERT
                expect(component.formControl.dirty).toEqual(true);
                expect(!component.formControl.valid).toEqual(true);
                expect(result).toEqual(true);
            });
            it('should return true if the field has more then 8 characters and is marked as dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.setValue('12345678910');
                component.formControl.markAsDirty();
                // ACT
                var result = component.isInvalid();
                // ASSERT
                expect(component.formControl.dirty).toEqual(true);
                expect(!component.formControl.valid).toEqual(true);
                expect(result).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=pass-certificate-number.spec.js.map