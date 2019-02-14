import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  WAITING_ROOM_VIEW_DID_ENTER,
  WaitingRoomViewDidEnter,
} from '../../pages/waiting-room/waiting-room.actions';

@Injectable()
export class WaitingRoomAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  waitingRoomViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VIEW_DID_ENTER),
    switchMap((action: WaitingRoomViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM);
      return of();
    }),
  );

}
