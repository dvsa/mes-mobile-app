import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../../providers/analytics/analytics.model';
import {
  PASS_FINALISTATION_VIEW_DID_ENTER,
  PassFinalisationViewDidEnter,
} from './pass-finalisation.actions';
import { TestsModel } from '../../../modules/tests/tests.model';
import { StoreModel } from '../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';

@Injectable()
export class PassFinalisationAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  passFinalisationViewDidEnter$ = this.actions$.pipe(
    ofType(PASS_FINALISTATION_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      )),
    ),
    switchMap(([action, tests]: [PassFinalisationViewDidEnter, TestsModel]) => {
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.PASS_FINALISATION, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );
}
