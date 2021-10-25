import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsDimensionIndices,
  AnalyticsErrorTypes, AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import { StoreModel } from '../../shared/models/store.model';
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
import {
  MANOEUVRES_PAGE_VALIDATION_ERROR,
  MANOEUVRES_VIEW_DID_ENTER,
  ManoeuvresPageValidationError,
  ManoeuvresViewDidEnter,
  MANOEUVRES_OPEN_ACTIVITY_CODE_MODAL,
  MANOEUVRES_ACTIVITY_CODE_SELECTED,
  ManoeuvresActivityCodeSelected,
  MANOEUVRES_PAGE_SUBMISSION, ManoeuvresViewPageSubmission, ManoeuvresActivityCodeModalOpened,
} from './manoeuvres.actions';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { getEnumKeyByValue } from '../../shared/helpers/enum-keys';

@Injectable()
export class ManoeuvresPageAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  manoeuvresPageViewDidEnter$ = this.actions$.pipe(
    ofType(MANOEUVRES_VIEW_DID_ENTER),
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
      [, tests, applicationReference, candidateId, category]:
        [ManoeuvresViewDidEnter, TestsModel, string, number, CategoryCode],
    ) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.MANOEUVRES, tests));
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  manoeuvresPageValidationError$ = this.actions$.pipe(
    ofType(MANOEUVRES_PAGE_VALIDATION_ERROR),
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
    switchMap(([action, tests, category]: [ManoeuvresPageValidationError, TestsModel, CategoryCode]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.MANOEUVRES, tests);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`, action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  manoeuvresPageSubmit$ = this.actions$.pipe(
    ofType(MANOEUVRES_PAGE_SUBMISSION),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(getTests))),
    )),
    switchMap(([, tests]: [ManoeuvresViewPageSubmission, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.MANOEUVRES, tests),
        AnalyticsEvents.SUBMIT_TEST,
        AnalyticsEvents.TEST_SUBMITTED,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  manoeuvresPageActivityCodeSelected$ = this.actions$.pipe(
    ofType(MANOEUVRES_ACTIVITY_CODE_SELECTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(getTests))),
    )),
    switchMap(([{ activityCode }, tests]: [ManoeuvresActivityCodeSelected, TestsModel]) => {
      const [description, code] = getEnumKeyByValue(ActivityCodes, activityCode);

      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.MANOEUVRES, tests),
        AnalyticsEvents.SET_ACTIVITY_CODE,
        `${code} - ${description}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  manoeuvresPageOpenActivityCodeSelect$ = this.actions$.pipe(
    ofType(MANOEUVRES_OPEN_ACTIVITY_CODE_MODAL),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(getTests))),
    )),
    switchMap(([, tests]: [ManoeuvresActivityCodeModalOpened, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.MANOEUVRES, tests),
        AnalyticsEvents.OPEN_MODAL,
        AnalyticsEvents.ACTIVITY_CODE_MODAL_OPENED,
      );
      return of(new AnalyticRecorded());
    }),
  );
}
