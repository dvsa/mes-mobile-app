import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
//  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model'
import {
  DEBRIEF_VIEW_DID_ENTER,
  DebriefViewDidEnter
} from '../../pages/debrief/debrief.actions';

@Injectable()
export class DebriefAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
//    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => {
            console.log('error initialising analytics')
          }
    );
  }

  @Effect()
  debriefViewDidEnter$ = this.actions$.pipe(
    ofType(DEBRIEF_VIEW_DID_ENTER),
    switchMap( (action: DebriefViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.DEBRIEF);
      return of();
    })
  );

}