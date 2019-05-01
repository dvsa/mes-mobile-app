import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as testDataActions from '../../modules/tests/test-data/test-data.actions';
import * as testSummaryActions from '../../modules/tests/test-summary/test-summary.actions';
import { PersistTests } from '../../modules/tests/tests.actions';

@Injectable()
export class OfficeEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  persistOfficeDataEffect$ = this.actions$.pipe(
    ofType(
        testDataActions.ADD_DANGEROUS_FAULT_COMMENT,
        testDataActions.ADD_SERIOUS_FAULT_COMMENT,
        testDataActions.ADD_DRIVING_FAULT_COMMENT,
        testSummaryActions.DEBRIEF_WITNESSED,
        testSummaryActions.DEBRIEF_UNWITNESSED,
        testSummaryActions.IDENTIFICATION_USED_CHANGED,
        testSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED,
        testSummaryActions.ROUTE_NUMBER_CHANGED,
        testSummaryActions.WEATHER_CONDITIONS_CHANGED,
        testSummaryActions.ADDITIONAL_INFORMATION_CHANGED,
        testSummaryActions.CANDIDATE_DESCRIPTION_CHANGED,
        testSummaryActions.D255_YES,
        testSummaryActions.D255_NO,
        ),
    map(() => new PersistTests()),
  );
}
