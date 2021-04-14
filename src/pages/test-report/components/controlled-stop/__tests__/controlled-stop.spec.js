import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ControlledStopComponent } from '../controlled-stop';
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
import { ControlledStopAddDrivingFault, ControlledStopRemoveFault, } from '../../../../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { configureTestSuite } from 'ng-bullet';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
describe('ControlledStopComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ControlledStopComponent,
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
        fixture = TestBed.createComponent(ControlledStopComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "B" /* B */));
    }));
    describe('Class', function () {
        describe('ControlledStopAddDrivingFault', function () {
            it('should dispatch an CONTROLLED_STOP_ADD_DRIVING_FAULT action for press', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
            it('should not dispatch an CONTROLLED_STOP_ADD_DRIVING_FAULT action for tap', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
            it('should not dispatch an CONTROLLED_STOP_ADD_DRIVING_FAULT action if there is already a driving fault', function () {
                component.controlledStopOutcome = CompetencyOutcome.DF;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
            it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is a serious fault', function () {
                component.controlledStopOutcome = CompetencyOutcome.S;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
            it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if serious mode is active', function () {
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
            it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is a dangerous fault', function () {
                component.controlledStopOutcome = CompetencyOutcome.D;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
            it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if dangerous mode is active', function () {
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopAddDrivingFault());
            });
        });
        describe('removeManoeuvreDrivingFault', function () {
            it('should dispatch a REMOVE_MANOEUVRE_FAULT action for press', function () {
                component.isRemoveFaultMode = true;
                component.controlledStopOutcome = CompetencyOutcome.DF;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopRemoveFault());
            });
            it('should dispatch a REMOVE_MANOEUVRE_FAULT action for tap', function () {
                component.isRemoveFaultMode = true;
                component.controlledStopOutcome = CompetencyOutcome.DF;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopRemoveFault());
            });
            it('should not dispatch a REMOVE_MANOEUVRE_FAULT action if in the wrong mode', function () {
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.controlledStopOutcome = CompetencyOutcome.D;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopRemoveFault());
            });
            it('should dispatch a REMOVE_MANOEUVRE_FAULT action if there is a serious fault', function () {
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.controlledStopOutcome = CompetencyOutcome.S;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopRemoveFault());
            });
            it('should dispatch a REMOVE_MANOEUVRE_FAULT action if there is a dangerous fault', function () {
                component.isRemoveFaultMode = true;
                component.isDangerousMode = true;
                component.controlledStopOutcome = CompetencyOutcome.D;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopRemoveFault());
            });
        });
    });
    describe('DOM', function () {
        it('should pass the number of driving faults to the driving faults badge component', function () {
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            component.controlledStopOutcome = CompetencyOutcome.DF;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
        it('should pass a ripple value of false to the competency button component', function () {
            fixture.detectChanges();
            component.isRemoveFaultMode = true;
            component.isSeriousMode = true;
            var competencyButton = fixture.debugElement.query(By.css('competency-button.controlled-stop-competency'))
                .componentInstance;
            fixture.detectChanges();
            expect(competencyButton.ripple).toEqual(false);
        });
        describe('Tick button effects', function () {
            it('should have added no classes to the tick button', function () {
                var tickButton = fixture.debugElement.query(By.css('competency-button.controlled-stop-tick'));
                fixture.detectChanges();
                expect(tickButton.nativeElement.className).toEqual('controlled-stop-tick');
            });
            it('should have added a checked class to the tick button', function () {
                var tickButton = fixture.debugElement.query(By.css('competency-button.controlled-stop-tick'));
                component.selectedControlledStop = true;
                fixture.detectChanges();
                expect(tickButton.nativeElement.className).toEqual('controlled-stop-tick checked');
            });
        });
    });
});
//# sourceMappingURL=controlled-stop.spec.js.map