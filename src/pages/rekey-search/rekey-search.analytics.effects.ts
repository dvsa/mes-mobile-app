import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import {
  REKEY_SEARCH_VIEW_DID_ENTER,
  RekeySearchViewDidEnter,
  SEARCH_BOOKED_TEST,
  SearchBookedTest,
} from './rekey-search.actions';
import {
  AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents,
} from '../../providers/analytics/analytics.model';
import { SLOT_ACCESSED } from '../../modules/journal/journal.actions';

@Injectable()
export class RekeySearchAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    ) {
  }

  @Effect()
  rekeySearchViewDidEnter$ = this.actions$.pipe(
    ofType(REKEY_SEARCH_VIEW_DID_ENTER),
    switchMap((action: RekeySearchViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.REKEY_SEARCH);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  rekeySearchPerformed$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_TEST),
    switchMap((action: SearchBookedTest) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.REKEY_SEARCH,
        AnalyticsEvents.TEST_BOOKING_SEARCH,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  rekeySlotAccessed$ = this.actions$.pipe(
    ofType(SLOT_ACCESSED),
    switchMap(() => {
      this.analytics.logEvent(
        AnalyticsEventCategories.REKEY_SEARCH,
        AnalyticsEvents.SELECT_DISABLED_CATEGORY,
        'Disabled category selected',
      );
      return of(new AnalyticRecorded());
    }),
  );
}
