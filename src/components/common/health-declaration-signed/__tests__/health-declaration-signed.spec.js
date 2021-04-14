import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { HealthDeclarationSignedComponent } from '../health-declaration-signed';
import { configureTestSuite } from 'ng-bullet';
describe('HealthDeclarationSignedComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                HealthDeclarationSignedComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(HealthDeclarationSignedComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('Class', function () {
        describe('healthDeclarationChanged', function () {
            it('should emit selected value - true', function () {
                spyOn(component.healthDeclarationChange, 'emit');
                component.healthDeclarationChanged('Signed');
                expect(component.healthDeclarationChange.emit).toHaveBeenCalledWith(true);
            });
            it('should emit selected value - false', function () {
                spyOn(component.healthDeclarationChange, 'emit');
                component.healthDeclarationChanged('NotSigned');
                expect(component.healthDeclarationChange.emit).toHaveBeenCalledWith(false);
            });
        });
        describe('invalid', function () {
            it('should validate the field when it is valid', function () {
                component.ngOnChanges();
                component.formGroup.get(HealthDeclarationSignedComponent.fieldName).setValue(true);
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
//# sourceMappingURL=health-declaration-signed.spec.js.map