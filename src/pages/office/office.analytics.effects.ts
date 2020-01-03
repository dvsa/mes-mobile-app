import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { withLatestFrom, switchMap, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsEventCategories, AnalyticsEvents, AnalyticsErrorTypes,
} from '../../providers/analytics/analytics.model';
import {
  OFFICE_VIEW_DID_ENTER,
  SAVING_WRITE_UP_FOR_LATER,
  OFFICE_VALIDATION_ERROR,
  OfficeValidationError,
  SavingWriteUpForLater,
  OfficeViewDidEnter,
  COMPLETE_TEST,
  CompleteTest,
} from '../../pages/office/office.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isPassed, getJournalData } from '../../modules/tests/tests.selector';
import { of } from 'rxjs/observable/of';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { TestsModel } from '../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { getCandidate } from '../../modules/tests/journal-data/cat-b/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { isRekey } from '../../modules/tests/rekey/rekey.selector';
import { getRekeyIndicator } from '../../modules/tests/rekey/rekey.reducer';
import {
  getApplicationReference,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';

@Injectable()
export class OfficeAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  officeViewDidEnter$ = this.actions$.pipe(
    ofType(OFFICE_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(isPassed),
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
          select(getJournalData),
          select(getApplicationReference),
          select(getApplicationNumber),
        ),
      ),
    )),
    switchMap((
        [action, tests, isPassed, candidateId, applicationReference]:
        [OfficeViewDidEnter, TestsModel, boolean, number, string],
      ) => {
      const screenName = isPassed
          ? formatAnalyticsText(AnalyticsScreenNames.PASS_TEST_SUMMARY, tests)
          : formatAnalyticsText(AnalyticsScreenNames.FAIL_TEST_SUMMARY, tests);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    },
    ),
  );

  @Effect()
  savingWriteUpForLaterEffect$ = this.actions$.pipe(
    ofType(SAVING_WRITE_UP_FOR_LATER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(isPassed),
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
          select(getJournalData),
          select(getApplicationReference),
          select(getApplicationNumber),
        ),
      ),
    )),
    switchMap(([action, tests, isPassed, candidateId, applicationReference]:
      [SavingWriteUpForLater, TestsModel, boolean, number, string]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);

      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.SAVE_WRITE_UP, tests),
        isPassed ? 'pass' : 'fail',
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  validationErrorEffect$ = this.actions$.pipe(
    ofType(OFFICE_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(isPassed),
        ),
      ),
    )),
    switchMap(([action, tests, isPassed]: [OfficeValidationError, TestsModel, boolean]) => {
      const screenName = isPassed ? AnalyticsScreenNames.PASS_TEST_SUMMARY : AnalyticsScreenNames.FAIL_TEST_SUMMARY;
      const formattedScreenName = formatAnalyticsText(screenName, tests);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${formattedScreenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  completeTest$ = this.actions$.pipe(
    ofType(COMPLETE_TEST),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getRekeyIndicator),
          select(isRekey),
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
          select(getJournalData),
          select(getApplicationReference),
          select(getApplicationNumber),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(isPassed),
        ),
      ),
    )),
    switchMap((
      [action, isRekey, candidateId, applicationReference, isPassed]:
      [CompleteTest, boolean, number, string, boolean],
    ) => {

      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);

      this.analytics.logEvent(
        AnalyticsEventCategories.POST_TEST,
        isRekey ? AnalyticsEvents.COMPLETE_REKEY_TEST : AnalyticsEvents.COMPLETE_TEST,
        isPassed ? 'pass' : 'fail',
      );

      return of(new AnalyticRecorded());
    }),
  );
}
