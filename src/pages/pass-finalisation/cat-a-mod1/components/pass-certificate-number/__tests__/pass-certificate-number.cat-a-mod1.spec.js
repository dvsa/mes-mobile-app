import { async, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { PassCertificateNumberCatAMod1Component } from '../pass-certificate-number.cat-a-mod1';
import { PASS_CERTIFICATE_LENGTH_A_MOD1, } from '../../../../../../providers/pass-certificate-validation/pass-certificate-validation.constants';
describe('PassCertificateNumberCatAMod1Component', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PassCertificateNumberCatAMod1Component,
            ],
            imports: [
                IonicModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PassCertificateNumberCatAMod1Component);
        component = fixture.componentInstance;
        component.form = new FormGroup({});
        component.formControl = new FormControl(null, [
            Validators.maxLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
            Validators.minLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
            Validators.pattern(component.passCertificateAMOD1Validator.pattern),
            Validators.required,
        ]);
    }));
    describe('Class', function () {
        describe('passCertificateNumberChanged', function () {
            it('should emit pass certificate number if 7 characters and valid', function () {
                spyOn(component.formControl, 'setErrors');
                spyOn(component.passCertificateNumberChange, 'emit');
                var passCertificateNumber = 'C26754E';
                component.passCertificateNumberChanged(passCertificateNumber);
                expect(component.formControl.setErrors).not.toHaveBeenCalled();
                expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
            });
            it('should recognise a permitted length but invalid format then set errors', function () {
                spyOn(component.formControl, 'setErrors');
                spyOn(component.passCertificateNumberChange, 'emit');
                var passCertificateNumber = 'ABCDEFG';
                component.passCertificateNumberChanged(passCertificateNumber);
                expect(component.formControl.setErrors).toHaveBeenCalledWith({
                    invalidFormat: passCertificateNumber,
                });
                expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
            });
            it('should recognise an illegal length then set errors', function () {
                spyOn(component.formControl, 'setErrors');
                spyOn(component.passCertificateNumberChange, 'emit');
                var passCertificateNumber = 'A1234567789';
                component.passCertificateNumberChanged(passCertificateNumber);
                expect(component.formControl.setErrors).toHaveBeenCalledWith({
                    actualLength: 11,
                    permittedLength: 8,
                    value: 'A1234567789',
                });
                expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
            });
            it('should recognise a correct string length & invalid byte length then set errors', function () {
                spyOn(component.formControl, 'setErrors');
                spyOn(component.passCertificateNumberChange, 'emit');
                var passCertificateNumber = 'B8711 2–';
                component.passCertificateNumberChanged(passCertificateNumber);
                expect(component.formControl.setErrors).toHaveBeenCalledWith({
                    actualLength: 10,
                    permittedLength: 8,
                    value: passCertificateNumber,
                });
                expect(component.passCertificateNumberChange.emit).toHaveBeenCalledWith(passCertificateNumber);
            });
        });
        describe('isInvalid', function () {
            it('should return false when the field is valid and not dirty', function () {
                // SETUP
                component.ngOnChanges();
                component.formControl.setValue('C26754E');
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
            it('should return true if the field has less then 7 characters and is marked as dirty', function () {
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
            it('should return true if the field has more then 7 characters and is marked as dirty', function () {
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
//# sourceMappingURL=pass-certificate-number.cat-a-mod1.spec.js.map