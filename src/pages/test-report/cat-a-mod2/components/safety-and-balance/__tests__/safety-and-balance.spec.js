import { SafetyAndBalanceComponent } from '../safety-and-balance';
import { TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { DrivingFaultsBadgeComponent } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
describe('SafetyAndBalanceComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SafetyAndBalanceComponent,
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
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SafetyAndBalanceComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "EUA2M2" /* EUA2M2 */));
    }));
    describe('Class', function () {
        var safetyAndBalanceScore = {
            drivingFaults: 1,
        };
        beforeEach(function () {
            spyOn(component.faultCountProvider, 'getSafetyAndBalanceFaultCount').and.returnValue(safetyAndBalanceScore);
        });
        it('should set the safety and balance questions riding fault count', function (done) {
            component.ngOnInit();
            component.componentState.safetyAndBalanceDrivingFaultCount$.subscribe(function (result) {
                expect(component.faultCountProvider.getSafetyAndBalanceFaultCount).toHaveBeenCalled();
                expect(result).toEqual(1);
                done();
            });
        });
    });
    describe('DOM', function () {
        it('should pass the number of S&B riding faults to the driving faults component', function () {
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            component.componentState.safetyAndBalanceDrivingFaultCount$ = of(1);
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
    });
});
//# sourceMappingURL=safety-and-balance.spec.js.map