import { async, TestBed } from '@angular/core/testing';
import { OtherReasonComponent } from '../other-reason';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('OtherReasonComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                OtherReasonComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(OtherReasonComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.ngOnChanges();
    }));
    describe('class', function () {
        describe('ngOnChanges', function () {
            it('should add the form controls for the checkbox and textarea', function () {
                expect(component.formGroup.get('otherSelected')).not.toBeNull();
                expect(component.formGroup.get('reason')).not.toBeNull();
            });
        });
        describe('selectedValueChanged', function () {
            it('should emit when reason is selected', function () {
                spyOn(component.selectedChange, 'emit');
                component.selectedValueChanged(true);
                expect(component.selectedChange.emit).toHaveBeenCalledWith(true);
            });
            it('should reset the field when unselecting the checkbox', function () {
                var field = component.formGroup.get('reason');
                spyOn(field, 'reset');
                component.selectedValueChanged(false);
                expect(field.reset).toHaveBeenCalled();
            });
        });
        describe('reasonTextChanged', function () {
            it('should emit the reason', function () {
                spyOn(component.reasonChange, 'emit');
                var reasonText = 'reason for change';
                component.reasonTextChanged(reasonText);
                expect(component.reasonChange.emit).toHaveBeenCalledWith(reasonText);
            });
        });
    });
    describe('DOM', function () {
        it('should show the reason textbox when selected', function () {
            component.selected = true;
            fixture.detectChanges();
            var textbox = fixture.debugElement.query(By.css('textarea'));
            expect(textbox).toBeDefined();
        });
        it('should not show the reason textbox when not selected', function () {
            component.selected = false;
            fixture.detectChanges();
            var textbox = fixture.debugElement.query(By.css('textarea'));
            expect(textbox).toBeNull();
        });
        it('should not show validation bar or message initially', function () {
            var validationBar = fixture.debugElement.query(By.css('.validation-bar.invalid'));
            var validationMessage = fixture.debugElement.query(By.css('.validation-message-row'));
            expect(validationBar).toBeNull();
            expect(validationMessage).toBeNull();
        });
        it('should show the validation bar and character count validation text when clearing the reason', function () {
            component.selected = true;
            fixture.detectChanges();
            var field = fixture.debugElement.query(By.css('#otherReason'));
            field.triggerEventHandler('change', { target: { value: 'Reason text' } });
            fixture.detectChanges();
            field.triggerEventHandler('change', { target: { value: '' } });
            fixture.detectChanges();
            var validationBar = fixture.debugElement.query(By.css('.validation-bar.invalid'));
            var validationMessage = fixture.debugElement.query(By.css('.validation-message-row'));
            expect(validationBar).toBeDefined();
            expect(validationMessage).toBeDefined();
        });
        it('should not show the validation bar or message after entering a reason', function () {
            component.selected = true;
            fixture.detectChanges();
            var field = fixture.debugElement.query(By.css('#otherReason'));
            field.triggerEventHandler('change', { target: { value: 'Reason text' } });
            fixture.detectChanges();
            var validationBar = fixture.debugElement.query(By.css('.validation-bar.invalid'));
            var validationMessage = fixture.debugElement.query(By.css('.validation-message-row'));
            expect(validationBar).toBeNull();
            expect(validationMessage).toBeNull();
        });
    });
});
//# sourceMappingURL=other-reason.spec.js.map