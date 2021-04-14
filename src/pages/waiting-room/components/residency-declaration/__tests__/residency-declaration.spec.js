import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser, } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ResidencyDeclarationComponent } from '../residency-declaration';
import { configureTestSuite } from 'ng-bullet';
describe('ResidencyDeclarationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ResidencyDeclarationComponent,
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
        fixture = TestBed.createComponent(ResidencyDeclarationComponent);
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
                var field = component.formGroup.get(ResidencyDeclarationComponent.fieldName);
                expect(field).not.toBeNull();
                expect(field.validator).not.toBeNull();
                expect(field.value).toEqual('true');
            });
        });
        describe('residencyDeclarationChanged', function () {
            it('should emit a residencyDeclarationChange event', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.ngOnChanges();
                component.residencyDeclarationChange = new EventEmitter();
                spyOn(component.residencyDeclarationChange, 'emit');
                // ACT
                component.residencyDeclarationChanged();
                fixture.detectChanges();
                // ASSERT
                expect(component.residencyDeclarationChange.emit).toHaveBeenCalled();
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
//# sourceMappingURL=residency-declaration.spec.js.map