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
  WAITING_ROOM_TO_CAR_VIEW_DID_ENTER,
  WaitingRoomToCarViewDidEnter,
  WAITING_ROOM_TO_CAR_ERROR,
  WaitingRoomToCarError,
  WAITING_ROOM_TO_CAR_VALIDATION_ERROR,
  WaitingRoomToCarValidationError,
  WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED,
  WaitingRoomToCarBikeCategoryChanged,
  WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED,
  WaitingRoomToCarBikeCategorySelected,
  WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL,
  WaitingRoomToCarViewBikeCategoryModal,
} from '../../pages/waiting-room-to-car/waiting-room-to-car.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import {
  getApplicationReference,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

@Injectable()
export class WaitingRoomToCarAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
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
        [WaitingRoomToCarViewDidEnter, TestsModel, string, number, CategoryCode],
    ) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
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
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestCategory),
        ),
      ),
    )),
    switchMap(([action, tests, category]: [WaitingRoomToCarError, TestsModel, CategoryCode]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
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
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestCategory),
        ),
      ),
    )),
    switchMap(([action, tests, category]: [WaitingRoomToCarValidationError, TestsModel, CategoryCode]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  waitingRoomToCarBikeCategoryChanged$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED),
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
    switchMap(([action, tests, category]: [WaitingRoomToCarBikeCategoryChanged, TestsModel, CategoryCode]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, action.selectedBikeCategory);
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM_TO_CAR, tests),
        formatAnalyticsText(AnalyticsEvents.BIKE_CATEGORY_CHANGED, tests),
        `bike category changed to ${action.initialBikeCategory} from ${action.selectedBikeCategory}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  waitingRoomToCarBikeCategorySelected$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED),
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
    switchMap(([action, tests, category]: [WaitingRoomToCarBikeCategorySelected, TestsModel, CategoryCode]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, action.bikeCategory);
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM_TO_CAR, tests),
        formatAnalyticsText(AnalyticsEvents.BIKE_CATEGORY_SELECTED, tests),
        `bike category ${action.bikeCategory} selected`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  waitingRoomToCarViewBikeCategoryModal$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [WaitingRoomToCarViewBikeCategoryModal, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM_TO_CAR, tests),
        formatAnalyticsText(AnalyticsEvents.BIKE_CATEGORY_MODAL_TRIGGERED, tests),
        `bike category selection modal triggered`,
      );
      return of(new AnalyticRecorded());
    }),
  );
}
