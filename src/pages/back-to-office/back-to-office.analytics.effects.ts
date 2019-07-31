import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  BACK_TO_OFFICE_VIEW_DID_ENTER,
  BackToOfficeViewDidEnter,
} from './back-to-office.actions';

@Injectable()
export class BackToOfficeAnalyticsEffects {
  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
    this.analytics.initialiseAnalytics()
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  backToOfficeViewDidEnter$ = this.actions$.pipe(
    ofType(BACK_TO_OFFICE_VIEW_DID_ENTER),
    switchMap((action: BackToOfficeViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.BACK_TO_OFFICE);
      return of();
    }),
  );
}
