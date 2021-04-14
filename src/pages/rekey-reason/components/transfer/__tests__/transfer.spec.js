import { async, TestBed } from '@angular/core/testing';
import { TransferComponent } from '../transfer';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
describe('TransferComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TransferComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TransferComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        component.ngOnChanges();
    }));
    describe('class', function () {
        describe('ngOnChanges', function () {
            it('should add the form controls for the checkbox and textarea', function () {
                expect(component.formGroup.get('transferSelected')).not.toBeNull;
                expect(component.formGroup.get('staffNumber')).not.toBeNull;
            });
        });
        describe('selectedValueChanged', function () {
            it('should emit when reason is selected', function () {
                spyOn(component.selectedChange, 'emit');
                component.selectedValueChanged(true);
                expect(component.selectedChange.emit).toHaveBeenCalledWith(true);
            });
            it('should reset the field when unselecting the checkbox', function () {
                var field = component.formGroup.get('staffNumber');
                spyOn(field, 'reset');
                component.selectedValueChanged(false);
                expect(field.reset).toHaveBeenCalled();
            });
        });
        describe('staffNumberValueChanged', function () {
            it('should emit the staff number', function () {
                spyOn(component.staffNumberChange, 'emit');
                var staffNumber = '123';
                component.staffNumberValueChanged(staffNumber);
                expect(component.staffNumberChange.emit).toHaveBeenCalledWith(123);
            });
        });
    });
    describe('DOM', function () {
        it('should show the staff number field when selected', function () {
            component.selected = true;
            fixture.detectChanges();
            var textbox = fixture.debugElement.query(By.css('#staffNumber'));
            expect(textbox).toBeDefined();
        });
        it('should not show the staff number field when not selected', function () {
            component.selected = false;
            fixture.detectChanges();
            var textbox = fixture.debugElement.query(By.css('#staffNumber'));
            expect(textbox).toBeNull();
        });
        it('should not show validation bar or message initially', function () {
            var validationBar = fixture.debugElement.query(By.css('.validation-bar.invalid'));
            var validationMessage = fixture.debugElement.query(By.css('.validation-message-row'));
            expect(validationBar).toBeNull();
            expect(validationMessage).toBeNull();
        });
        it('should show the validation bar and required text when clearing the staff number', function () {
            component.selected = true;
            fixture.detectChanges();
            var field = fixture.debugElement.query(By.css('#staffNumber'));
            field.triggerEventHandler('change', { target: { value: '123' } });
            fixture.detectChanges();
            field.triggerEventHandler('change', { target: { value: '' } });
            fixture.detectChanges();
            var validationBar = fixture.debugElement.query(By.css('.validation-bar.invalid'));
            var validationMessage = fixture.debugElement.query(By.css('.validation-message-row'));
            expect(validationBar).toBeDefined();
            expect(validationMessage).toBeDefined();
        });
        it('should not show the validation bar or message after entering a staff number', function () {
            component.selected = true;
            fixture.detectChanges();
            var field = fixture.debugElement.query(By.css('#staffNumber'));
            field.triggerEventHandler('change', { target: { value: '123' } });
            fixture.detectChanges();
            var validationBar = fixture.debugElement.query(By.css('.validation-bar.invalid'));
            var validationMessage = fixture.debugElement.query(By.css('.validation-message-row'));
            expect(validationBar).toBeNull();
            expect(validationMessage).toBeNull();
        });
    });
});
//# sourceMappingURL=transfer.spec.js.map