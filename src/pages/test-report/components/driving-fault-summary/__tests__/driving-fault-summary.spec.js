import { async, TestBed } from '@angular/core/testing';
import { DrivingFaultSummaryComponent } from '../driving-fault-summary';
import { Store, StoreModule } from '@ngrx/store';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { Subscription } from 'rxjs';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../modules/tests/tests.actions';
import { AddDrivingFault } from '../../../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { Competencies } from '../../../../../modules/tests/test-data/test-data.constants';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { PopulateTestCategory } from '../../../../../modules/tests/category/category.actions';
import { configureTestSuite } from 'ng-bullet';
describe('DrivingFaultSummary', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DrivingFaultSummaryComponent,
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                FaultCountProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DrivingFaultSummaryComponent);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
        store$ = TestBed.get(Store);
    }));
    describe('DOM', function () {
        var componentEl;
        beforeEach(function () {
            componentEl = fixture.debugElement;
            store$.dispatch(new StartTest(103, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
        });
        it('should display 0 driving faults for a new test', function () {
            fixture.detectChanges();
            var summaryCount = componentEl.query(By.css('#summary-count')).nativeElement;
            expect(summaryCount.textContent).toBe('0');
        });
        it('should display 3 driving faults when 3 driving faults have been marked', function () {
            store$.dispatch(new AddDrivingFault({ competency: Competencies.clearance, newFaultCount: 1 }));
            store$.dispatch(new AddDrivingFault({ competency: Competencies.controlsSteering, newFaultCount: 1 }));
            store$.dispatch(new AddDrivingFault({ competency: Competencies.moveOffControl, newFaultCount: 1 }));
            fixture.detectChanges();
            var summaryCount = componentEl.query(By.css('#summary-count')).nativeElement;
            expect(summaryCount.textContent).toBe('3');
        });
    });
    describe('driverTypeSwitch()', function () {
        it('should return R when a category equals EUAM1,', function () {
            var driverType = component.driverTypeSwitch("EUAM1" /* EUAM1 */);
            expect(driverType).toEqual('R');
        });
        it('should return R when a category equals EUAM2', function () {
            var driverType = component.driverTypeSwitch("EUAM2" /* EUAM2 */);
            expect(driverType).toEqual('R');
        });
        it('should return D when a category equals B', function () {
            var driverType = component.driverTypeSwitch("B" /* B */);
            expect(driverType).toEqual('D');
        });
        it('should return D when a category equals B+E', function () {
            var driverType = component.driverTypeSwitch("B+E" /* BE */);
            expect(driverType).toEqual('D');
        });
    });
});
//# sourceMappingURL=driving-fault-summary.spec.js.map