import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { PassCertificateDeclarationComponent } from '../pass-certificate-declaration';
describe('PassCertificateDeclarationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PassCertificateDeclarationComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PassCertificateDeclarationComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('Class', function () {
        describe('passCertificateDeclarationChanged', function () {
            it('should emit selected value - true', function () {
                spyOn(component.passCertificateDeclarationChange, 'emit');
                component.passCertificateDeclarationChanged(true);
                expect(component.passCertificateDeclarationChange.emit).toHaveBeenCalledWith(true);
            });
            it('should emit selected value - false', function () {
                spyOn(component.passCertificateDeclarationChange, 'emit');
                component.passCertificateDeclarationChanged(false);
                expect(component.passCertificateDeclarationChange.emit).toHaveBeenCalledWith(false);
            });
        });
        describe('invalid', function () {
            it('should validate the field when it is valid', function () {
                component.ngOnChanges();
                component.formGroup.get(PassCertificateDeclarationComponent.fieldName).setValue(true);
                fixture.detectChanges();
                var result = component.invalid;
                expect(result).toEqual(false);
            });
            it('should not validate the field when it is dirty', function () {
                component.ngOnChanges();
                component.formControl.markAsDirty();
                fixture.detectChanges();
                var result = component.invalid;
                expect(result).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=pass-certificate-declaration.spec.js.map