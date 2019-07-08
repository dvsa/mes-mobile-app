import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsEventCategories, AnalyticsEvents,
} from '../../providers/analytics/analytics.model';
import {
  BACK_TO_OFFICE_VIEW_DID_ENTER,
  BackToOfficeViewDidEnter,
  DEFER_WRITE_UP,
} from './back-to-office.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getCurrentTest, isPassed, getJournalData } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';

@Injectable()
export class BackToOfficeAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  backToOfficeViewDidEnter$ = this.actions$.pipe(
    ofType(BACK_TO_OFFICE_VIEW_DID_ENTER),
    switchMap((action: BackToOfficeViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.BACK_TO_OFFICE);
      return of();
    }),
  );

  deferWriteUpEffect$ = this.actions$.pipe(
    ofType(DEFER_WRITE_UP),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(isPassed),
      ),
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getJournalData),
      ),
    ),
    switchMap(([action, isPassed, journalDataOfTest]) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.BACK_TO_OFFICE,
        AnalyticsEvents.DEFER_WRITE_UP,
        isPassed ? 'pass' : 'fail',
      );

      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.TEST_ID, journalDataOfTest.testSlotAttributes.slotId.toString());
      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId.toString());

      return of();
    }),
  );
}
