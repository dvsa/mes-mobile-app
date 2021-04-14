import { async, TestBed } from '@angular/core/testing';
import { EcoComponent } from '../eco';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../components/competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../components/common/tick-indicator/tick-indicator';
import { StartTest } from '../../../../../modules/tests/tests.actions';
import { ToggleEco, TogglePlanningEco, ToggleControlEco, } from '../../../../../modules/tests/test-data/common/eco/eco.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Eco component', function () {
    var fixture;
    var component;
    var store$;
    var storeDispatchSpy;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EcoComponent,
                MockComponent(TickIndicatorComponent),
                MockComponent(CompetencyButtonComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(EcoComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "B" /* B */));
        storeDispatchSpy = spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('Record that Eco has been assessed', function () {
            it('should dispatch a TOGGLE_ECO action', function () {
                component.toggleEco();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleEco());
            });
            it('should not dispatch a TOGGLE_ECO action when advice has been given', function () {
                component.adviceGivenControl = true;
                component.toggleEco();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleEco());
            });
        });
        describe('Record that Eco Control advice was given', function () {
            it('should dispatch a TOGGLE_CONTROL_ECO action', function () {
                component.toggleEcoControl();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleControlEco());
            });
        });
        describe('Record that Eco Planning advice was given', function () {
            it('should dispatch a TOGGLE_PLANNING_ECO action', function () {
                component.toggleEcoPlanning();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new TogglePlanningEco());
            });
        });
    });
});
//# sourceMappingURL=eco.spec.js.map