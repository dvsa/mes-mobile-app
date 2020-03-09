import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
  AnalyticsDimensionIndices,
  AnalyticsErrorTypes,
  AnalyticsEvents,
  AnalyticsEventCategories,
} from '../../providers/analytics/analytics.model';
import {
  WAITING_ROOM_VIEW_DID_ENTER,
  WaitingRoomViewDidEnter,
  WAITING_ROOM_VALIDATION_ERROR,
  WaitingRoomValidationError,
} from '../../pages/waiting-room/waiting-room.actions';
import {
  CBT_NUMBER_CHANGED,
  CbtNumberChanged,
} from '../../modules/tests/pre-test-declarations/cat-a/pre-test-declarations.cat-a.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { TestsModel } from '../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import {
  getApplicationReference,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

@Injectable()
export class WaitingRoomAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
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
          select(getCurrentTest),
          select(getJournalData),
          select(getApplicationReference),
          select(getApplicationNumber),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getJournalData),
          select(getCandidate),
          select(getCandidateId),
          ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestCategory),
        ),
      ),
    )),
    switchMap((
      [action, tests, applicationReference, candidateId, category]:
      [WaitingRoomViewDidEnter, TestsModel, string, number, CategoryCode],
    ) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  waitingRoomValidationError$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestCategory),
        ),
      ),
    )),
    switchMap(([action, tests, category]: [WaitingRoomValidationError, TestsModel, CategoryCode]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  cbtNumberChanged$ = this.actions$.pipe(
    ofType(CBT_NUMBER_CHANGED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [CbtNumberChanged, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM, tests),
        formatAnalyticsText(AnalyticsEvents.CBT_CHANGED, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );
}
