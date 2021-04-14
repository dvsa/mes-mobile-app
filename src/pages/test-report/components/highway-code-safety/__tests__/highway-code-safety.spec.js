import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../components/common/tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent } from '../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent, } from '../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent, } from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { StartTest } from '../../../../../modules/tests/tests.actions';
import { configureTestSuite } from 'ng-bullet';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import { HighwayCodeSafetyComponent } from '../highway-code-safety';
import { HighwayCodeSafetyAddDrivingFault, HighwayCodeSafetyRemoveFault, } from '../../../../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.actions';
describe('HighwayCodeSafetyComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                HighwayCodeSafetyComponent,
                MockComponent(TickIndicatorComponent),
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(SeriousFaultBadgeComponent),
                MockComponent(DangerousFaultBadgeComponent),
                MockComponent(CompetencyButtonComponent),
            ],
            providers: [
                TestDataByCategoryProvider,
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(HighwayCodeSafetyComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "F" /* F */));
    }));
    describe('Class', function () {
        describe('HighwayCodeSafetyAddDrivingFault', function () {
            it('should dispatch an HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT action for press', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new HighwayCodeSafetyAddDrivingFault());
            });
            it('should not dispatch an HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT action for tap', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new HighwayCodeSafetyAddDrivingFault());
            });
            it('should not dispatch an HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT action if already a driving fault', function () {
                component.highwayCodeSafetyDrivingFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new HighwayCodeSafetyAddDrivingFault());
            });
            it('should not dispatch an HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT action if there is a serious fault', function () {
                component.highwayCodeSafetySeriousFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new HighwayCodeSafetyAddDrivingFault());
            });
            it('should not dispatch an HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT action if serious mode is active', function () {
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new HighwayCodeSafetyAddDrivingFault());
            });
            it('should not dispatch an HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT action if dangerous mode is active', function () {
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new HighwayCodeSafetyAddDrivingFault());
            });
        });
        describe('removeHighwayCodeSafetyDrivingFault', function () {
            it('should dispatch a HIGHWAY_CODE_SAFETY_REMOVE_FAULT action for press', function () {
                component.isRemoveFaultMode = true;
                component.highwayCodeSafetyDrivingFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new HighwayCodeSafetyRemoveFault());
            });
            it('should dispatch a HIGHWAY_CODE_SAFETY_REMOVE_FAULT action for tap', function () {
                component.isRemoveFaultMode = true;
                component.highwayCodeSafetyDrivingFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new HighwayCodeSafetyRemoveFault());
            });
            it('should not dispatch a HIGHWAY_CODE_SAFETY_REMOVE_FAULT action if in the wrong mode', function () {
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.highwayCodeSafetyDrivingFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new HighwayCodeSafetyRemoveFault());
            });
            it('should dispatch a HIGHWAY_CODE_SAFETY_REMOVE_FAULT action if there is a serious fault', function () {
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.highwayCodeSafetySeriousFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new HighwayCodeSafetyRemoveFault());
            });
        });
    });
    describe('DOM', function () {
        it('should pass the number of driving faults to the driving faults badge component', function () {
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            component.highwayCodeSafetyDrivingFault = true;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
        it('should pass a ripple value of false to the competency button component', function () {
            fixture.detectChanges();
            component.isRemoveFaultMode = true;
            component.isSeriousMode = true;
            var competencyButton = fixture.debugElement.query(By.css('competency-button.highway-code-safety-competency'))
                .componentInstance;
            fixture.detectChanges();
            expect(competencyButton.ripple).toEqual(false);
        });
        describe('Tick button effects', function () {
            it('should have added no classes to the tick button', function () {
                var tickButton = fixture.debugElement.query(By.css('competency-button.highway-code-safety-tick'));
                fixture.detectChanges();
                expect(tickButton.nativeElement.className).toEqual('highway-code-safety-tick');
            });
            it('should have added a checked class to the tick button', function () {
                var tickButton = fixture.debugElement.query(By.css('competency-button.highway-code-safety-tick'));
                component.selectedHighwayCodeSafety = true;
                fixture.detectChanges();
                console.log(tickButton.nativeElement);
                expect(tickButton.nativeElement.className).toEqual('highway-code-safety-tick checked');
            });
        });
    });
});
//# sourceMappingURL=highway-code-safety.spec.js.map