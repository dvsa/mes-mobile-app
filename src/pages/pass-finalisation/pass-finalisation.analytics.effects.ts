import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  PASS_FINALISTATION_VIEW_DID_ENTER,
  PassFinalisationViewDidEnter,
} from '../../pages/pass-finalisation/pass-finalisation.actions';

@Injectable()
export class PassFinalisationAnalyticsEffects {

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
  passFinalisationViewDidEnter$ = this.actions$.pipe(
    ofType(PASS_FINALISTATION_VIEW_DID_ENTER),
    switchMap((action: PassFinalisationViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.PASS_FINALISATION);
      return of();
    }),
  );
}
