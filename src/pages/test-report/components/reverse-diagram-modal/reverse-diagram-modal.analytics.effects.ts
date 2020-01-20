import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
  AnalyticsDimensionIndices,
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../../../providers/analytics/analytics.model';
import {
  REVERSE_DIAGRAM_VIEW_DID_ENTER,
  ReverseDiagramViewDidEnter,
  REVERSE_DIAGRAM_OPENED,
  ReverseDiagramOpened,
  REVERSE_DIAGRAM_CLOSED,
  ReverseDiagramClosed,
} from './reverse-diagram-modal.actions';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { TestsModel } from '../../../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../../../providers/analytics/analytics.actions';
import { formatAnalyticsText } from '../../../../shared/helpers/format-analytics-text';
import {
  getApplicationReference,
} from '../../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

@Injectable()
export class ReverseDiagramModalAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  reverseDiagramViewDidEnter$ = this.actions$.pipe(
    ofType(REVERSE_DIAGRAM_VIEW_DID_ENTER),
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
      [ReverseDiagramViewDidEnter, TestsModel, string, number, CategoryCode],
    ) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.REVERSE_DIAGRAM, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  reverseDiagramOpened$ = this.actions$.pipe(
    ofType(REVERSE_DIAGRAM_OPENED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [ReverseDiagramOpened, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REVERSE_DIAGRAM_OPENED, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  reverseDiagramClosed$ = this.actions$.pipe(
    ofType(REVERSE_DIAGRAM_CLOSED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [ReverseDiagramClosed, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REVERSE_DIAGRAM_CLOSED, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );
}
