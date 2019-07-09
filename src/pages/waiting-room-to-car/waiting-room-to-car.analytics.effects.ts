import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
  AnalyticsDimensionIndices,
  AnalyticsErrorTypes,
} from '../../providers/analytics/analytics.model';
import {
  WAITING_ROOM_TO_CAR_VIEW_DID_ENTER,
  WaitingRoomToCarViewDidEnter,
  WAITING_ROOM_TO_CAR_ERROR,
  WaitingRoomToCarError,
  WAITING_ROOM_TO_CAR_VALIDATION_ERROR,
  WaitingRoomToCarValidationError,
} from '../../pages/waiting-room-to-car/waiting-room-to-car.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId, getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/candidate/candidate.selector';

@Injectable()
export class WaitingRoomToCarAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => {})
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  waitingRoomToCarViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VIEW_DID_ENTER),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTestSlotId),
      ),
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getJournalData),
        select(getCandidate),
        select(getCandidateId),
        ),
    ),
    switchMap(([action, slotId, candidateId]: [WaitingRoomToCarViewDidEnter, string, number]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_ID, `${slotId}`);
      this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM_TO_CAR);
      return of();
    }),
  );

  @Effect()
  waitingRoomToCarError$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_ERROR),
    switchMap((action: WaitingRoomToCarError) => {
      this.analytics.logError(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${AnalyticsScreenNames.WAITING_ROOM_TO_CAR})`,
        action.errorMessage);
      return of();
    }),
  );

  @Effect()
  waitingRoomToCarValidationError$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VALIDATION_ERROR),
    switchMap((action: WaitingRoomToCarValidationError) => {
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${AnalyticsScreenNames.WAITING_ROOM_TO_CAR})`,
        action.errorMessage);
      return of();
    }),
  );

}
