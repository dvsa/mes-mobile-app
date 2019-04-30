import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as testSummaryActions from './test-summary.actions';
import { PersistTests } from '../tests.actions';

@Injectable()
export class TestSummaryEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  additionalInformationChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.ADDITIONAL_INFORMATION_CHANGED),
    map(() => new PersistTests()),
  );

  @Effect()
  candidateDescriptionChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.CANDIDATE_DESCRIPTION_CHANGED),
    map(() => new PersistTests()),
  );

  @Effect()
  routeNumberChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.ROUTE_NUMBER_CHANGED),
    map(() => new PersistTests()),
  );

  @Effect()
  debriefWitnessedChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.DEBRIEF_WITNESSED),
    map(() => new PersistTests()),
    );

  @Effect()
  debriefUnWitnessedChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.DEBRIEF_UNWITNESSED),
    map(() => new PersistTests()),
  );

  @Effect()
  identificationUsedChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.IDENTIFICATION_USED_CHANGED),
    map(() => new PersistTests()),
  );

  @Effect()
  independentDrivingTypeChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED),
    map(() => new PersistTests()),
  );

  @Effect()
  d255YesEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.D255_YES),
    map(() => new PersistTests()),
  );

  @Effect()
  d255NoEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.D255_NO),
    map(() => new PersistTests()),
  );

  @Effect()
  weatherConditionsChangedEffect$ = this.actions$.pipe(
    ofType(testSummaryActions.WEATHER_CONDITIONS_CHANGED),
    map(() => new PersistTests()),
  );

}
