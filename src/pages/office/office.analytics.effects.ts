import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  OFFICE_VIEW_DID_ENTER,
  OfficeViewDidEnter,
} from '../../pages/office/office.actions';

@Injectable()
export class OfficeAnalyticsEffects {
  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => {})
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  officeViewDidEnter$ = this.actions$.pipe(
    ofType(OFFICE_VIEW_DID_ENTER),
    switchMap((action: OfficeViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.OFFICE);
      return of();
    }),
  );
}
