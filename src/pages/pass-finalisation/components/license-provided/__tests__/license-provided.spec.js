import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { LicenseProvidedComponent } from '../license-provided';
import { configureTestSuite } from 'ng-bullet';
describe('licenseProvidedComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                LicenseProvidedComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LicenseProvidedComponent);
        component = fixture.componentInstance;
        component.form = new FormGroup({});
    }));
    describe('Class', function () {
        describe('ProvisionalLicenseReceived', function () {
            it('should emit license received if license received is selected', function () {
                spyOn(component.licenseReceived, 'emit');
                component.provisionalLicenseReceived();
                expect(component.licenseReceived.emit).toHaveBeenCalled();
            });
        });
        describe('ProvisionalLicneseNotReceived', function () {
            it('should emit license not received if license not received is selected', function () {
                spyOn(component.licenseNotReceived, 'emit');
                component.provisionalLicenseNotReceived();
                expect(component.licenseNotReceived.emit).toHaveBeenCalled();
            });
        });
        describe('isInvalid', function () {
            it('should validate the field when it is valid', function () {
                component.license = true;
                component.ngOnChanges();
                fixture.detectChanges();
                var result = component.isInvalid();
                expect(result).toEqual(false);
            });
            it('should not validate the field when it is dirty', function () {
                component.license = null;
                component.ngOnChanges();
                component.formControl.markAsDirty();
                fixture.detectChanges();
                var result = component.isInvalid();
                expect(result).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=license-provided.spec.js.map