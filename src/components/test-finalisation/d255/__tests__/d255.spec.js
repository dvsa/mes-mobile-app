import { async, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { IonicModule } from 'ionic-angular';
import { D255Component, ValidD255Values } from '../d255';
import { FormGroup } from '@angular/forms';
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
describe('D255Component', function () {
    var fixture;
    var component;
    var outcomeBehaviourMapProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [D255Component],
            imports: [IonicModule],
            providers: [OutcomeBehaviourMapProvider],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(D255Component);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        outcomeBehaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
    }));
    describe('Class', function () {
        describe('ngOnChanges', function () {
            it('should add a form control for D255 with a validator if the field should be visible', function () {
                spyOn(outcomeBehaviourMapProvider, 'getVisibilityType').and.returnValue(VisibilityType.Visible);
                component.ngOnChanges();
                expect(component.formGroup.get(D255Component.fieldName)).not.toBeNull();
                expect(component.formGroup.get(D255Component.fieldName).validator).not.toBeNull();
            });
            it('should add a form control for D255 with no validator if the field should be hidden', function () {
                spyOn(outcomeBehaviourMapProvider, 'getVisibilityType').and.returnValue(VisibilityType.NotVisible);
                component.ngOnChanges();
                expect(component.formGroup.get(D255Component.fieldName)).not.toBeNull();
                expect(component.formGroup.get(D255Component.fieldName).validator).toBeNull();
            });
        });
    });
    describe('d255Changed', function () {
        it('should emit a event with the correct value if the form control is valid', function () {
            spyOn(component.d255Change, 'emit');
            component.ngOnChanges();
            component.d255Changed(ValidD255Values.YES);
            expect(component.d255Change.emit).toHaveBeenCalledWith(true);
        });
        it('should not emit an event if the form control is not valid', function () {
            spyOn(outcomeBehaviourMapProvider, 'getVisibilityType').and.returnValue(VisibilityType.Visible);
            spyOn(component.d255Change, 'emit');
            component.ngOnChanges();
            component.formGroup.get(D255Component.fieldName).setErrors({ incorrect: true });
            component.d255Changed(ValidD255Values.YES);
            expect(component.d255Change.emit).not.toHaveBeenCalled();
        });
    });
    describe('getD255OrDefault', function () {
        it('should return YES if D255 is set to true', function () {
            component.d255 = true;
            fixture.detectChanges();
            expect(component.getD255OrDefault()).toEqual(ValidD255Values.YES);
        });
        it('should return NO if D255 is set to false', function () {
            component.d255 = false;
            fixture.detectChanges();
            expect(component.getD255OrDefault()).toEqual(ValidD255Values.NO);
        });
        it('should set the default value for the field if one exists and not other value has been set', function () {
            component.d255 = null;
            spyOn(outcomeBehaviourMapProvider, 'hasDefault').and.returnValue(true);
            spyOn(outcomeBehaviourMapProvider, 'getDefault').and.returnValue(ValidD255Values.YES);
            spyOn(component, 'd255Changed');
            fixture.detectChanges;
            expect(component.getD255OrDefault()).toEqual(ValidD255Values.YES);
            expect(outcomeBehaviourMapProvider.hasDefault).toHaveBeenCalled();
            expect(outcomeBehaviourMapProvider.getDefault).toHaveBeenCalled();
            expect(component.d255Changed).toHaveBeenCalledWith(ValidD255Values.YES);
        });
        it('should return null if there is no default value and the value has not been set', function () {
            component.d255 = null;
            spyOn(outcomeBehaviourMapProvider, 'hasDefault').and.returnValue(false);
            fixture.detectChanges();
            expect(component.getD255OrDefault()).toBeNull();
        });
    });
});
//# sourceMappingURL=d255.spec.js.map