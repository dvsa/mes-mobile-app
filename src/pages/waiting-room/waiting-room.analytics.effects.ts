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
import {
  getCurrentTestSlotId,
  getCurrentTest,
  getJournalData,
} from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/candidate/candidate.selector';
import { TestsModel } from '../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';

@Injectable()
export class WaitingRoomAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  waitingRoomViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VIEW_DID_ENTER),
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
    switchMap(([action, tests, slotId, candidateId]: [WaitingRoomViewDidEnter, TestsModel, string, number]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_ID, `${slotId}`);
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  submitWaitingRoomInfoError$ = this.actions$.pipe(
    ofType(SUBMIT_WAITING_ROOM_INFO_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [SubmitWaitingRoomInfoError, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests);
      this.analytics.logError(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  submitWaitingRoomInfoErrorValidation$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [WaitingRoomValidationError, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

}
