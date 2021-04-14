import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { EyesightTestComponent } from '../eyesight-test';
import { configureTestSuite } from 'ng-bullet';
describe('EyesightTestComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EyesightTestComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(EyesightTestComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('DOM', function () {
        it('should call EyesightResultChanged with P when Pass is pressed', function () {
            spyOn(component, 'eyesightTestResultChanged');
            component.ngOnChanges();
            var passEyesightRadio = fixture.debugElement.query(By.css('#eyesight-pass'));
            passEyesightRadio.triggerEventHandler('change', { target: { value: 'P' } });
            fixture.detectChanges();
            expect(component.eyesightTestResultChanged).toHaveBeenCalledWith('P');
        });
        it('should call EyesightResultChanged with F when Fail is pressed', function () {
            spyOn(component, 'eyesightTestResultChanged');
            component.ngOnChanges();
            var passEyesightRadio = fixture.debugElement.query(By.css('#eyesight-fail'));
            passEyesightRadio.triggerEventHandler('change', { target: { value: 'F' } });
            fixture.detectChanges();
            expect(component.eyesightTestResultChanged).toHaveBeenCalledWith('F');
        });
    });
});
//# sourceMappingURL=eyesight-test.spec.js.map