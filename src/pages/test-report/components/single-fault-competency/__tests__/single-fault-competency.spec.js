import { async, TestBed } from '@angular/core/testing';
import { SingleFaultCompetencyComponent } from '../single-fault-competency';
import { AppModule } from '../../../../../app/app.module';
import { SingleFaultCompetencyNames } from '../../../../../modules/tests/test-data/test-data.constants';
import { StoreModule, Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../components/competency-button/competency-button';
import { DrivingFaultsBadgeComponent, } from '../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { DangerousFaultBadgeComponent, } from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { testReportReducer } from '../../../test-report.reducer';
import { NavigationStateProvider } from '../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';
import { journalReducer } from '../../../../../modules/journal/journal.reducer';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { RemoveSingleFaultCompetencyOutcome, SetSingleFaultCompetencyOutcome, RemoveSingleSeriousFaultCompetencyOutcome, RemoveSingleDangerousFaultCompetencyOutcome, } from '../../../../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { ToggleSeriousFaultMode, ToggleRemoveFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
describe('SingleFaultCompetencyComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SingleFaultCompetencyComponent,
                MockComponent(CompetencyButtonComponent),
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(SeriousFaultBadgeComponent),
                MockComponent(DangerousFaultBadgeComponent),
            ],
            imports: [
                AppModule,
                IonicModule,
                StoreModule.forRoot({
                    journal: journalReducer,
                    tests: testsReducer,
                    testReport: testReportReducer,
                }),
            ],
            providers: [
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SingleFaultCompetencyComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        describe('getLabel', function () {
            it('should get the correct label for a competency', function () {
                component.competency = SingleFaultCompetencyNames.useOfStand;
                expect(component.getLabel()).toBe('Use of stand');
            });
        });
        describe('onTap', function () {
            it('should call addOrRemoveFault function', function () {
                var addOrRemoveFaultSpy = spyOn(component, 'addOrRemoveFault');
                component.onTap();
                expect(addOrRemoveFaultSpy).toHaveBeenCalled();
            });
        });
        describe('onPress', function () {
            it('should call addOrRemoveFault function', function () {
                var addOrRemoveFaultSpy = spyOn(component, 'addOrRemoveFault');
                component.onPress();
                expect(addOrRemoveFaultSpy).toHaveBeenCalledWith(true);
            });
        });
        describe('canButtonRipple', function () {
            it('should allow ripple when in remove dangerous mode and there is a dangerous fault', function () {
                component.isRemoveFaultMode = true;
                component.isDangerousMode = true;
                component.hasDangerousFault = true;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(true);
            });
            it('should not allow ripple when in remove dangerous mode and there is not a dangerous fault', function () {
                component.isRemoveFaultMode = true;
                component.isDangerousMode = true;
                component.hasDangerousFault = false;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(false);
            });
            it('should allow ripple when in remove serious mode and there is a serious fault', function () {
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.hasSeriousFault = true;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(true);
            });
            it('should not allow ripple when in remove serious mode and there is not a serious fault', function () {
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.hasSeriousFault = false;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(false);
            });
            it('should allow ripple when in remove fault mode and there is a driving fault', function () {
                component.isRemoveFaultMode = true;
                component.hasDrivingFault = true;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(true);
            });
            it('should not allow ripple when in remove fault mode and there is not a driving fault', function () {
                component.isRemoveFaultMode = true;
                component.hasDrivingFault = false;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(false);
            });
            it('should not allow ripple when in remove fault mode and no driving faults', function () {
                component.isRemoveFaultMode = true;
                component.canButtonRipple();
                expect(component.allowRipple).toEqual(false);
            });
            it('should not allow ripple if there is a driving fault', function () {
                component.isRemoveFaultMode = false;
                component.hasDrivingFault = true;
                component.canButtonRipple();
                expect(component.allowRipple).toBe(false);
            });
            it('should not allow ripple if there is a serious fault', function () {
                component.isRemoveFaultMode = false;
                component.hasSeriousFault = true;
                component.canButtonRipple();
                expect(component.allowRipple).toBe(false);
            });
            it('should not allow ripple if there is a dangerous fault', function () {
                component.isRemoveFaultMode = false;
                component.hasDangerousFault = true;
                component.canButtonRipple();
                expect(component.allowRipple).toBe(false);
            });
            it('should allow ripple if there is no fault on the competency', function () {
                component.isRemoveFaultMode = false;
                component.hasDrivingFault = false;
                component.hasSeriousFault = false;
                component.hasDangerousFault = false;
                component.canButtonRipple();
                expect(component.allowRipple).toBe(true);
            });
        });
        describe('addOrRemoveFault', function () {
            it('should call removeFault when isRemoveFaultMode is true', function () {
                var removeFaultSpy = spyOn(component, 'removeFault');
                component.isRemoveFaultMode = true;
                component.addOrRemoveFault();
                expect(removeFaultSpy).toHaveBeenCalled();
            });
            it('should call addFault when isRemoveFaultMode is false', function () {
                var removeFaultSpy = spyOn(component, 'addFault');
                var wasPress = true;
                component.isRemoveFaultMode = false;
                component.addOrRemoveFault(wasPress);
                expect(removeFaultSpy).toHaveBeenCalledWith(wasPress);
            });
        });
        describe('removeDrivingFault', function () {
            it('should dispatch a RemoveSingleFaultCompetencyOutcome when there is a driving fault to remove', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDrivingFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSingleFaultCompetencyOutcome(competencyName));
            });
            it('should not dispatch a RemoveSingleFaultCompetencyOutcome when no fault', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDrivingFault = false;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSingleFaultCompetencyOutcome(competencyName));
            });
            it('should NOT remove driving fault when serious mode is active', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDrivingFault = true;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSingleSeriousFaultCompetencyOutcome(competencyName));
            });
            it('should NOT remove driving fault when dangerous mode is active', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDrivingFault = true;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSingleDangerousFaultCompetencyOutcome(competencyName));
            });
        });
        describe('removeSeriousFault', function () {
            it('should dispatch a RemoveSingleSeriousFaultCompetencyOutcome for press and hold', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasSeriousFault = true;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSingleSeriousFaultCompetencyOutcome(component.competency));
            });
            it('should dispatch a RemoveSingleSeriousFaultCompetencyOutcome for press', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasSeriousFault = true;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSingleSeriousFaultCompetencyOutcome(component.competency));
            });
            it('should not dispatch a RemoveSingleDangerousFaultCompetencyOutcome when is dangerous mode', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasSeriousFault = true;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSingleDangerousFaultCompetencyOutcome(component.competency));
            });
            it('should not remove serious mode after removal attempt on competency with no serious fault', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasSeriousFault = false;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleRemoveFaultMode());
            });
        });
        describe('removeDangerousFault', function () {
            it('should dispatch a RemoveSingleDangerousFaultCompetencyOutcome for press and hold', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDangerousFault = true;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSingleDangerousFaultCompetencyOutcome(component.competency));
            });
            it('should dispatch a RemoveSingleDangerousFaultCompetencyOutcome for press', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDangerousFault = true;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSingleDangerousFaultCompetencyOutcome(component.competency));
            });
            it('should not dispatch a RemoveSingleSeriousFaultCompetencyOutcome when is serious mode', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDangerousFault = true;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSingleSeriousFaultCompetencyOutcome(component.competency));
            });
            it('should not remove dangerous mode after removal attempt on competency with no dangerous fault', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                component.competency = competencyName;
                component.hasDangerousFault = false;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleRemoveFaultMode());
            });
        });
        describe('addFault', function () {
            it('should add dangerous fault when dangerous mode is on', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                var wasPress = false;
                component.competency = competencyName;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addFault(wasPress);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new SetSingleFaultCompetencyOutcome(component.competency, CompetencyOutcome.D));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
            it('should add serious fault when serious mode is on', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                var wasPress = false;
                component.competency = competencyName;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addFault(wasPress);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new SetSingleFaultCompetencyOutcome(component.competency, CompetencyOutcome.S));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
            it('should add driving fault when wasPress is true', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                var wasPress = true;
                component.competency = competencyName;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addFault(wasPress);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new SetSingleFaultCompetencyOutcome(component.competency, CompetencyOutcome.DF));
            });
            it('should not add driving fault when wasPress is false', function () {
                var competencyName = SingleFaultCompetencyNames.useOfStand;
                var wasPress = false;
                component.competency = competencyName;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addFault(wasPress);
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new SetSingleFaultCompetencyOutcome(component.competency, CompetencyOutcome.DF));
            });
        });
        describe('competencyHasFault', function () {
            it('should return true if it has driving fault', function () {
                component.hasDrivingFault = true;
                var result = component.competencyHasFault();
                expect(result).toBe(true);
            });
            it('should return true if it has serious fault', function () {
                component.hasSeriousFault = true;
                var result = component.competencyHasFault();
                expect(result).toBe(true);
            });
            it('should return true if it has dangerous fault', function () {
                component.hasDangerousFault = true;
                var result = component.competencyHasFault();
                expect(result).toBe(true);
            });
            it('should return false if it has no fault', function () {
                component.hasDrivingFault = false;
                component.hasSeriousFault = false;
                component.hasDangerousFault = false;
                var result = component.competencyHasFault();
                expect(result).toBe(false);
            });
        });
        describe('getFaultCount', function () {
            it('should return 1 if it has driving fault', function () {
                component.hasDrivingFault = true;
                var result = component.getFaultCount();
                expect(result).toBe(1);
            });
            it('should return 0 if it has no driving fault', function () {
                component.hasDrivingFault = false;
                var result = component.getFaultCount();
                expect(result).toBe(0);
            });
        });
    });
});
//# sourceMappingURL=single-fault-competency.spec.js.map