import { TestDataEffects } from '../test-data.effects';
import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as drivingFaultsActions from '../common/driving-faults/driving-faults.actions';
import * as ecoActions from '../common/eco/eco.actions';
import * as testsActions from '../../tests.actions';
import { testsReducer } from '../../tests.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { Competencies } from '../test-data.constants';
import { configureTestSuite } from 'ng-bullet';
describe('Test Data Effects', function () {
    var effects;
    var actions$;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                TestDataEffects,
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(TestDataEffects);
        store$ = TestBed.get(Store);
    });
    describe('throttleAddDrivingFaultEffect', function () {
        it('should dispatch an action to add driving fault', function (done) {
            var faultPayload = {
                competency: Competencies.ancillaryControls,
                newFaultCount: 1,
            };
            var throttleAddDrivingFault = new drivingFaultsActions.ThrottleAddDrivingFault(faultPayload);
            // ARRANGE - setup the store
            store$.dispatch(new testsActions.StartTest(123456, "B" /* B */));
            store$.dispatch(throttleAddDrivingFault);
            // ACT - replay the action for the effect
            actions$.next(throttleAddDrivingFault);
            // ASSERT
            effects.throttleAddDrivingFaultEffect$.subscribe(function (result) {
                expect(result).toEqual(new drivingFaultsActions.AddDrivingFault(faultPayload));
                done();
            });
        });
    });
    describe('setEcoControlCompletedEffect', function () {
        it('should dispatch an action to toggle eco to be completed', function (done) {
            var toggleControlEcoAction = new ecoActions.ToggleControlEco();
            // ARRANGE - setup the store
            store$.dispatch(new testsActions.StartTest(123456, "B" /* B */));
            store$.dispatch(toggleControlEcoAction);
            // ACT - replay the action for the effect
            actions$.next(toggleControlEcoAction);
            // ASSERT
            effects.setEcoControlCompletedEffect$.subscribe(function (result) {
                expect(result).toEqual(new ecoActions.ToggleEco());
                done();
            });
        });
    });
    describe('setEcoPlanningCompletedEffect', function () {
        it('should dispatch an action to toggle eco to be completed', function (done) {
            var togglePlanningEcoAction = new ecoActions.TogglePlanningEco();
            // ARRANGE - setup the store
            store$.dispatch(new testsActions.StartTest(123456, "B" /* B */));
            store$.dispatch(togglePlanningEcoAction);
            // ACT - replay the action for the effect
            actions$.next(togglePlanningEcoAction);
            // ASSERT
            effects.setEcoPlanningCompletedEffect$.subscribe(function (result) {
                expect(result).toEqual(new ecoActions.ToggleEco());
                done();
            });
        });
    });
});
//# sourceMappingURL=test-data.effects.spec.js.map