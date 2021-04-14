import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { ReceiptDeclarationComponent } from '../receipt-declaration';
import { TranslateModule, } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('ReceiptDeclarationComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ReceiptDeclarationComponent,
            ],
            imports: [
                IonicModule,
                TranslateModule.forRoot(),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ReceiptDeclarationComponent);
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
                var field = component.formGroup.get(ReceiptDeclarationComponent.fieldName);
                expect(field).not.toBeNull();
                expect(field.validator).not.toBeNull();
                expect(field.value).toEqual('true');
            });
        });
        describe('receiptDeclarationChanged', function () {
            it('should emit a receiptDeclarationChange event', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.ngOnChanges();
                component.receiptDeclarationChange = new EventEmitter();
                spyOn(component.receiptDeclarationChange, 'emit');
                // ACT
                component.receiptDeclarationChanged();
                fixture.detectChanges();
                // ASSERT
                expect(component.receiptDeclarationChange.emit).toHaveBeenCalled();
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
//# sourceMappingURL=receipt-declaration.spec.js.map