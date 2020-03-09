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
import {
  CIRCUIT_TYPE_CHANGED,
  CircuitTypeChanged,
} from '../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.actions';
import {
  MODE_OF_TRANSPORT_CHANGED,
  ModeOfTransportChanged,
} from '../../modules/tests/test-summary/cat-a-mod2/test-summary.cat-a-mod2.actions';
import {
  INDEPENDENT_DRIVING_TYPE_CHANGED,
  IndependentDrivingTypeChanged,
} from '../../modules/tests/test-summary/common/test-summary.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isPassed, getJournalData } from '../../modules/tests/tests.selector';
import { of } from 'rxjs';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { TestsModel } from '../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { isRekey } from '../../modules/tests/rekey/rekey.selector';
import { getRekeyIndicator } from '../../modules/tests/rekey/rekey.reducer';
import {
  getApplicationReference,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

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

  @Effect()
  setCircuit$ = this.actions$.pipe(
    ofType(CIRCUIT_TYPE_CHANGED),
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
    concatMap(([action, tests, category]: [CircuitTypeChanged, TestsModel, CategoryCode]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests),
        formatAnalyticsText(AnalyticsEvents.CIRCUIT_CHANGED, tests),
        `Circuit type ${action.circuitType} selected`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  setIndependentDrivingType$ = this.actions$.pipe(
    ofType(INDEPENDENT_DRIVING_TYPE_CHANGED),
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
    concatMap(([action, tests, category]: [IndependentDrivingTypeChanged, TestsModel, CategoryCode]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests),
        formatAnalyticsText(AnalyticsEvents.INDEPENDENT_DRIVING_TYPE_CHANGED, tests),
        `${action.drivingType} selected`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  setModeOfTransport$ = this.actions$.pipe(
    ofType(MODE_OF_TRANSPORT_CHANGED),
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
    concatMap(([action, tests, category]: [ModeOfTransportChanged, TestsModel, CategoryCode]) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests),
        formatAnalyticsText(AnalyticsEvents.MODE_OF_TRANSPORT_CHANGED, tests),
        `${action.modeOfTransport} selected`,
      );
      return of(new AnalyticRecorded());
    }),
  );
}
