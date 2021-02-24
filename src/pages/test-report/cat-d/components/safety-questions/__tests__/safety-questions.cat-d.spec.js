import { TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { DrivingFaultsBadgeComponent } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { TestDataByCategoryProvider } from '../../../../../../providers/test-data-by-category/test-data-by-category';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
import { SafetyQuestionsCatDComponent, } from '../safety-questions.cat-d';
describe('SafetyQuestionsComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SafetyQuestionsCatDComponent,
                MockComponent(DrivingFaultsBadgeComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                FaultCountProvider,
                TestDataByCategoryProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SafetyQuestionsCatDComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "D" /* D */));
    }));
    describe('Class', function () {
        var safetyQuestionsScore = {
            drivingFaults: 1,
        };
        beforeEach(function () {
            spyOn(component.faultCountProvider, 'getSafetyQuestionsFaultCount').and.returnValue(safetyQuestionsScore);
        });
        it('should set the safety questions driving fault count', function (done) {
            component.testCategory = "D" /* D */;
            component.ngOnInit();
            component.componentState.safetyQuestionsDrivingFaultCount$.subscribe(function (result) {
                expect(component.faultCountProvider.getSafetyQuestionsFaultCount).toHaveBeenCalled();
                expect(result).toEqual(1);
                done();
            });
        });
    });
    describe('DOM', function () {
        it('should pass the number of safety Question driving faults to the driving faults component', function () {
            component.testCategory = "D" /* D */;
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            component.componentState.safetyQuestionsDrivingFaultCount$ = of(1);
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
    });
});
//# sourceMappingURL=safety-questions.cat-d.spec.js.map