import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsErrorTypes,
} from '../../providers/analytics/analytics.model';
import {
  COMMUNICATION_VIEW_DID_ENTER,
  CommunicationViewDidEnter,
  COMMUNICATION_VALIDATION_ERROR,
  CommunicationValidationError,
} from './communication.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import {
  getApplicationReference,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
   getApplicationNumber,
} from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

@Injectable()
export class CommunicationAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  communicationViewDidEnter$ = this.actions$.pipe(
    ofType(COMMUNICATION_VIEW_DID_ENTER),
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
      [CommunicationViewDidEnter, TestsModel, string, number, CategoryCode],
    ) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.COMMUNICATION, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  communicationValidationError$ = this.actions$.pipe(
    ofType(COMMUNICATION_VALIDATION_ERROR),
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
    switchMap(([action, tests, category]: [CommunicationValidationError, TestsModel, CategoryCode]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.COMMUNICATION, tests);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.logError(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`,
        action.errorMessage);
      return of(new AnalyticRecorded());
    }),
  );

}
