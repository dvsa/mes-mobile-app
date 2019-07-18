import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
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
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';

@Injectable()
export class WaitingRoomToCarAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  waitingRoomToCarViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
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
    )),
    switchMap(([action, tests, slotId, candidateId]: [WaitingRoomToCarViewDidEnter, TestsModel, string, number]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_ID, `${slotId}`);
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  waitingRoomToCarError$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [WaitingRoomToCarError, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests);
      this.analytics.logError(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  waitingRoomToCarValidationError$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [WaitingRoomToCarValidationError, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

}
