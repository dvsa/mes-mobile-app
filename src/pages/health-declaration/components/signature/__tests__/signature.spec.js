import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { SignatureComponent } from '../signature';
import { MockComponent } from 'ng-mocks';
import { SignatureAreaComponent } from '../../../../../components/common/signature-area/signature-area';
import { configureTestSuite } from 'ng-bullet';
describe('SignatureComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SignatureComponent,
                MockComponent(SignatureAreaComponent),
            ],
            imports: [
                IonicModule,
                TranslateModule.forRoot(),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SignatureComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('ngOnChanges', function () {
            it('should correctly setup the form control', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.signature = 'abcdefg';
                // ACT
                component.ngOnChanges();
                // ASSERT
                var field = component.formGroup.get(SignatureComponent.fieldName);
                expect(field).not.toBeNull();
                expect(field.validator).not.toBeNull();
                expect(field.value).toEqual('abcdefg');
            });
        });
        describe('isInvalid', function () {
            it('should validate the field when it is valid', function () {
                // ARRANGE
                component.formGroup = new FormGroup({});
                component.signature = 'test data';
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
//# sourceMappingURL=signature.spec.js.map