import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { FormGroup } from '@angular/forms';
import { CBTNumberComponent } from '../cbt-number';
import { configureTestSuite } from 'ng-bullet';
describe('CBTNumberComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CBTNumberComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CBTNumberComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('Class', function () {
        describe('cbtNumberChanged', function () {
            it('It should emit a cbt number if the characters only contain numbers', function () {
                spyOn(component.cbtNumberChange, 'emit');
                var cbtNumber = '1234567';
                component.cbtNumberChanged(cbtNumber);
                expect(component.cbtNumberChange.emit).toHaveBeenCalledWith(cbtNumber);
            });
        });
        describe('invalid', function () {
            it('should be invalid the length is greater then 7', function () {
                component.cbtNumber = '12345678';
                component.ngOnChanges();
                var result = component.invalid();
                expect(result).toEqual(false);
            });
            it('should be invalid when the length is less then 7', function () {
                component.cbtNumber = '1234';
                component.ngOnChanges();
                var result = component.invalid();
                expect(result).toEqual(false);
            });
            it('should be invalid when the field when it is empty', function () {
                component.cbtNumber = '';
                component.ngOnChanges();
                var result = component.invalid();
                expect(result).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=cbt-number.spec.js.map