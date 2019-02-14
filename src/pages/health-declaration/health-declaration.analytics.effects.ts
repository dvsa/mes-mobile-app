import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  HEALTH_DECLARATION_VIEW_DID_ENTER,
  HealthDeclarationViewDidEnter,
} from './health-declaration.actions';

@Injectable()
export class HealthDeclarationAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  healthDeclarationViewDidEnter$ = this.actions$.pipe(
    ofType(HEALTH_DECLARATION_VIEW_DID_ENTER),
    switchMap((action: HealthDeclarationViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.HEALTH_DECLARATION);
      return of();
    }),
  );

}
