import { VehicleChecksComponent } from '../vehicle-checks';
import { TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { SeriousFaultBadgeComponent } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { DrivingFaultsBadgeComponent } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksComponent,
                MockComponent(SeriousFaultBadgeComponent),
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
        fixture = TestBed.createComponent(VehicleChecksComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "B+E" /* BE */));
    }));
    describe('Class', function () {
        var vehicleChecksScore = {
            drivingFaults: 4,
            seriousFaults: 1,
        };
        beforeEach(function () {
            spyOn(component.faultCountProvider, 'getVehicleChecksFaultCount').and.returnValue(vehicleChecksScore);
        });
        it('should set the vehicle checks driving fault count', function (done) {
            component.ngOnInit();
            component.componentState.vehicleChecksDrivingFaultCount$.subscribe(function (result) {
                expect(component.faultCountProvider.getVehicleChecksFaultCount).toHaveBeenCalled();
                expect(result).toEqual(4);
                done();
            });
        });
        it('should set the vehicle checks serious fault count', function (done) {
            component.ngOnInit();
            component.componentState.vehicleChecksSeriousFaultCount$.subscribe(function (result) {
                expect(component.faultCountProvider.getVehicleChecksFaultCount).toHaveBeenCalled();
                expect(result).toEqual(1);
                done();
            });
        });
    });
    describe('DOM', function () {
        it('should pass the number of VC driving faults to the driving faults component', function () {
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            component.componentState.vehicleChecksDrivingFaultCount$ = of(3);
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(3);
        });
        it('should pass true to the serious faults badge if there are serious VC faults', function () {
            fixture.detectChanges();
            var seriousFaultsBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
                .componentInstance;
            component.componentState.vehicleChecksSeriousFaultCount$ = of(1);
            fixture.detectChanges();
            expect(seriousFaultsBadge.showBadge).toEqual(true);
        });
    });
});
//# sourceMappingURL=vehicle-checks.spec.js.map