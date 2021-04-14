import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { InsuranceDeclarationComponent } from '../insurance-declaration';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser, } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('InsuranceDeclarationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                InsuranceDeclarationComponent,
            ],
            imports: [
                IonicModule,
                TranslateModule.forRoot(),
            ],
            providers: [
                TranslateService,
                TranslateLoader,
                TranslateParser,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(InsuranceDeclarationComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('ngOnChanges', function () {
            it('should correctly setup the form control', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.selected = 'true';
                // ACT
                component.ngOnChanges();
                // ASSERT
                var field = component.formGroup.get(InsuranceDeclarationComponent.fieldName);
                expect(field).not.toBeNull();
                expect(field.validator).not.toBeNull();
                expect(field.value).toEqual('true');
            });
        });
        describe('insuranceDeclarationChanged', function () {
            it('should emit a insuranceDeclarationChange event', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.ngOnChanges();
                component.insuranceDeclarationChange = new EventEmitter();
                spyOn(component.insuranceDeclarationChange, 'emit');
                // ACT
                component.insuranceDeclarationChanged();
                fixture.detectChanges();
                // ASSERT
                expect(component.insuranceDeclarationChange.emit).toHaveBeenCalled();
            });
        });
        describe('isInvalid', function () {
            it('should validate the field when it is valid', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.selected = 'true';
                component.ngOnChanges();
                fixture.detectChanges();
                // ACT
                var result = component.isInvalid();
                // ASSERT
                expect(result).toEqual(false);
            });
            it('should not validate the field when it is dirty', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.ngOnChanges();
                component.formControl.markAsDirty();
                fixture.detectChanges();
                // ACT
                var result = component.isInvalid();
                // ASSERT
                expect(result).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=insurance-declaration.spec.js.map