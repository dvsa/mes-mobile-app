import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';
import {
  REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER,
  RekeyUploadOutcomeViewDidEnter,
} from './rekey-upload-outcome.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { TestsModel } from '../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';

@Injectable()
export class RekeyUploadOutcomeAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  rekeyUploadedViewDidEnter$ = this.actions$.pipe(
    ofType(REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [RekeyUploadOutcomeViewDidEnter, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.REKEY_UPLOADED, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );
}
