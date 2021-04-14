import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { CandidateSectionComponent } from '../candidate-section';
import { AppModule } from '../../../../../app/app.module';
import { TestOutcome } from '../../../../../modules/tests/tests.constants';
describe('CandidateSectionComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CandidateSectionComponent,
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CandidateSectionComponent);
        component = fixture.componentInstance;
    }));
    describe('getTestOutcomeClass', function () {
        it('should return pass when the TestOutcome is passed', function () {
            expect(component.getTestOutcomeClass(TestOutcome.Passed)).toEqual('pass');
        });
        it('should return fail when the TestOutcome is Failed', function () {
            expect(component.getTestOutcomeClass(TestOutcome.Failed)).toEqual('fail');
        });
        it('should return terminated when the TestOutcome is Terminated', function () {
            expect(component.getTestOutcomeClass(TestOutcome.Terminated)).toEqual('terminated');
        });
    });
});
//# sourceMappingURL=candidate-section.spec.js.map