import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, concatMap } from 'rxjs/operators';

import * as dangerousFaultsActions
  from '../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as seriousFaultsActions from '../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import * as drivingFaultsActions from '../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import * as testSummaryActions from '../../modules/tests/test-summary/common/test-summary.actions';
import * as officeActions from './office.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { of } from 'rxjs/observable/of';

@Injectable()
export class OfficeEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  persistOfficeDataEffect$ = this.actions$.pipe(
    ofType(
      dangerousFaultsActions.ADD_DANGEROUS_FAULT_COMMENT,
      seriousFaultsActions.ADD_SERIOUS_FAULT_COMMENT,
      drivingFaultsActions.ADD_DRIVING_FAULT_COMMENT,
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
    map(() => new testsActions.PersistTests()),
  );

  @Effect()
  completeTestEffect$ = this.actions$.pipe(
    ofType(officeActions.COMPLETE_TEST),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTestSlotId),
        ),
      ),
    )),
    switchMap(([action, slotId]) => {
      return [
        new testStatusActions.SetTestStatusCompleted(slotId),
        new testsActions.PersistTests(),
      ];
    }),
  );
}
