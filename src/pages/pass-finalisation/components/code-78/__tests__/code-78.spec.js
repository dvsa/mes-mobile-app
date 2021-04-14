import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { Code78Component } from '../code-78';
import { configureTestSuite } from 'ng-bullet';
describe('code78Component', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                Code78Component,
            ],
            imports: [
                IonicModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(Code78Component);
        component = fixture.componentInstance;
        component.form = new FormGroup({});
    }));
    describe('Class', function () {
        describe('Code78Present', function () {
            it('should emit code 78 present if code 78 is present is selected', function () {
                spyOn(component.code78Present, 'emit');
                component.code78IsPresent();
                expect(component.code78Present.emit).toHaveBeenCalledWith(true);
            });
        });
        describe('Code78NotPresent', function () {
            it('should emit code 78 not present if code 78 is not present is selected', function () {
                spyOn(component.code78Present, 'emit');
                component.code78IsNotPresent();
                expect(component.code78Present.emit).toHaveBeenCalledWith(false);
            });
        });
        describe('isInvalid', function () {
            it('should validate the field when it is valid', function () {
                component.code78 = true;
                component.ngOnChanges();
                fixture.detectChanges();
                var result = component.isInvalid();
                expect(result).toEqual(false);
            });
            it('should not validate the field when it is dirty', function () {
                component.code78 = null;
                component.ngOnChanges();
                component.formControl.markAsDirty();
                fixture.detectChanges();
                var result = component.isInvalid();
                expect(result).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=code-78.spec.js.map