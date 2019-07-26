import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { withLatestFrom, concatMap, switchMap } from 'rxjs/operators';
import * as testDataActions from './../test-data/test-data.actions';
import { of } from 'rxjs/observable/of';
import { StoreModel } from '../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from './../tests.reducer';
import { getCurrentTest } from './../tests.selector';
import { Eco } from '@dvsa/mes-test-schema/categories/B';
import { getTestData } from './test-data.reducer';
import { getEco } from './test-data.selector';

@Injectable()
export class TestDataEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  setEcoControlCompletedEffect$ = this.actions$.pipe(
    ofType(
      testDataActions.TOGGLE_CONTROL_ECO,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestData),
          select(getEco),
        ),
      ),
    )),
    switchMap(([action, eco]: [testDataActions.ToggleControlEco, Eco]) => {
      if (eco.adviceGivenControl && !eco.completed) {
        return of(new testDataActions.ToggleEco());
      }
      return of();
    }),
  );

  @Effect()
  setEcoPlanningCompletedEffect$ = this.actions$.pipe(
    ofType(
      testDataActions.TOGGLE_PLANNING_ECO,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestData),
          select(getEco),
        ),
      ),
    )),
    switchMap(([action, eco]: [testDataActions.TogglePlanningEco, Eco]) => {
      if (eco.adviceGivenPlanning && !eco.completed) {
        return of(new testDataActions.ToggleEco());
      }
      return of();
    }),
  );

}
