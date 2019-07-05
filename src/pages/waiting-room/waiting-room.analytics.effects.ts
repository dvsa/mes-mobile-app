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
  WAITING_ROOM_VIEW_DID_ENTER,
  WaitingRoomViewDidEnter,
  SUBMIT_WAITING_ROOM_INFO_ERROR,
  SubmitWaitingRoomInfoError,
  WAITING_ROOM_VALIDATION_ERROR,
  WaitingRoomValidationError,
} from '../../pages/waiting-room/waiting-room.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId, getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/candidate/candidate.selector';

@Injectable()
export class WaitingRoomAnalyticsEffects {

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
  waitingRoomViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VIEW_DID_ENTER),
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
    switchMap(([action, slotId, candidateId]: [WaitingRoomViewDidEnter, string, number]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_ID, `${slotId}`);
      this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM);
      return of();
    }),
  );

  @Effect()
  submitWaitingRoomInfoErrorEffect$ = this.actions$.pipe(
    ofType(SUBMIT_WAITING_ROOM_INFO_ERROR),
    switchMap((action: SubmitWaitingRoomInfoError) => {
      this.analytics.logError(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${AnalyticsScreenNames.WAITING_ROOM})`,
        action.errorMessage);
      return of();
    }),
  );

  @Effect()
  submitWaitingRoomInfoErrorValidationEffect$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VALIDATION_ERROR),
    switchMap((action: WaitingRoomValidationError) => {
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${AnalyticsScreenNames.WAITING_ROOM})`,
        action.errorMessage);
      return of();
    }),
  );

}
