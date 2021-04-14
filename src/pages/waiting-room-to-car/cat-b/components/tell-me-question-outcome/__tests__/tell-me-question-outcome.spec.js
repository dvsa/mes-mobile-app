import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { TellMeQuestionOutcomeComponent } from '../tell-me-question-outcome';
import { AppModule } from '../../../../../../app/app.module';
import { configureTestSuite } from 'ng-bullet';
describe('TellMeQuestionOutcomeComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TellMeQuestionOutcomeComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TellMeQuestionOutcomeComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
    }));
    describe('DOM', function () {
        it('should call tellMeQuestionOutcomeChanged  with P when Pass is pressed', function () {
            spyOn(component, 'tellMeQuestionOutcomeChanged');
            component.ngOnChanges();
            component.tellMeQuestionSelected = true;
            fixture.detectChanges();
            var correctRadio = fixture.debugElement.query(By.css('#tellme-correct'));
            correctRadio.triggerEventHandler('change', { target: { value: 'P' } });
            fixture.detectChanges();
            expect(component.tellMeQuestionOutcomeChanged).toHaveBeenCalledWith('P');
        });
        it('should call tellMeQuestionOutcomeChanged with DF when Fail is pressed', function () {
            spyOn(component, 'tellMeQuestionOutcomeChanged');
            component.ngOnChanges();
            component.tellMeQuestionSelected = true;
            fixture.detectChanges();
            var faultRadio = fixture.debugElement.query(By.css('#tellme-fault'));
            faultRadio.triggerEventHandler('change', { target: { value: 'DF' } });
            fixture.detectChanges();
            expect(component.tellMeQuestionOutcomeChanged).toHaveBeenCalledWith('DF');
        });
    });
});
//# sourceMappingURL=tell-me-question-outcome.spec.js.map