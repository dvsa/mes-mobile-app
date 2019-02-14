import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  WAITING_ROOM_TO_CAR_VIEW_DID_ENTER,
  WaitingRoomToCarViewDidEnter
} from '../../pages/waiting-room-to-car/waiting-room-to-car.actions';

@Injectable()
export class WaitingRoomToCarAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => {
            console.log('error initialising analytics')
          }
    );
  }


  @Effect()
  waitingRoomToCarViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VIEW_DID_ENTER),
    switchMap( (action: WaitingRoomToCarViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM_TO_CAR);
      return of();
    })
  );

}