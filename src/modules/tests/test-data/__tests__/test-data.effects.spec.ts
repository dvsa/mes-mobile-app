import { TestDataEffects } from '../test-data.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testDataActions from '../test-data.actions';
import * as journalActions from '../../../../pages/journal/journal.actions';
import { testsReducer } from '../../tests.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { Competencies } from '../test-data.constants';
import { FaultPayload } from '../test-data.models';

describe('Test Data Effects', () => {

  let effects: TestDataEffects;
  let actions$: any;
  let store$: Store<StoreModel>;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        TestDataEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(TestDataEffects);
    store$ = TestBed.get(Store);
  });

  describe('throttleAddDrivingFaultEffect', () => {
    it('should dispatch an action to add driving fault', (done) => {
      const faultPayload: FaultPayload = {
        competency: Competencies.ancillaryControls,
        newFaultCount: 1,
      };
      const throttleAddDrivingFault = new testDataActions.ThrottleAddDrivingFault(faultPayload);
      // ARRANGE - setup the store
      store$.dispatch(new journalActions.StartTest(123456));
      store$.dispatch(throttleAddDrivingFault);
      // ACT - replay the action for the effect
      actions$.next(throttleAddDrivingFault);
      // ASSERT
      effects.throttleAddDrivingFaultEffect$.subscribe((result) => {
        expect(result).toEqual(new testDataActions.AddDrivingFault(faultPayload));
        done();
      });
    });
  });

  describe('setEcoControlCompletedEffect', () => {
    it('should dispatch an action to toggle eco to be completed', (done) => {
      const toggleControlEcoAction = new testDataActions.ToggleControlEco();
      // ARRANGE - setup the store
      store$.dispatch(new journalActions.StartTest(123456));
      store$.dispatch(toggleControlEcoAction);
      // ACT - replay the action for the effect
      actions$.next(toggleControlEcoAction);
      // ASSERT
      effects.setEcoControlCompletedEffect$.subscribe((result) => {
        expect(result).toEqual(new testDataActions.ToggleEco());
        done();
      });
    });
  });

  describe('setEcoPlanningCompletedEffect', () => {
    it('should dispatch an action to toggle eco to be completed', (done) => {
      const togglePlanningEcoAction = new testDataActions.TogglePlanningEco();
      // ARRANGE - setup the store
      store$.dispatch(new journalActions.StartTest(123456));
      store$.dispatch(togglePlanningEcoAction);
      // ACT - replay the action for the effect
      actions$.next(togglePlanningEcoAction);
      // ASSERT
      effects.setEcoPlanningCompletedEffect$.subscribe((result) => {
        expect(result).toEqual(new testDataActions.ToggleEco());
        done();
      });
    });
  });

});
