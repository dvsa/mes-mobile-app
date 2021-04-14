import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { HealthDeclarationComponent } from '../health-declaration';
import { TranslateModule, TranslateService, TranslateLoader, TranslateParser, } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('HealthDeclarationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                HealthDeclarationComponent,
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
        fixture = TestBed.createComponent(HealthDeclarationComponent);
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
                var field = component.formGroup.get(HealthDeclarationComponent.fieldName);
                expect(field.value).toEqual('true');
            });
        });
        describe('healthDeclarationChanged', function () {
            it('should emit a healthDeclarationChange event', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.ngOnChanges();
                component.healthDeclarationChange = new EventEmitter();
                spyOn(component.healthDeclarationChange, 'emit');
                // ACT
                component.healthDeclarationChanged();
                fixture.detectChanges();
                // ASSERT
                expect(component.healthDeclarationChange.emit).toHaveBeenCalled();
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
        });
    });
});
//# sourceMappingURL=health-declaration.spec.js.map