import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { withLatestFrom, switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsEventCategories, AnalyticsEvents, AnalyticsErrorTypes,
} from '../../providers/analytics/analytics.model';
import {
  OFFICE_VIEW_DID_ENTER, SAVING_WRITE_UP_FOR_LATER, VALIDATION_ERROR, ValidationError,
} from '../../pages/office/office.actions';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isPassed, getJournalData } from '../../modules/tests/tests.selector';
import { of } from 'rxjs/observable/of';

@Injectable()
export class OfficeAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => {})
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  officeViewDidEnter$ = this.actions$.pipe(
    ofType(OFFICE_VIEW_DID_ENTER),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(isPassed),
      ),
    ),
    switchMap(([action, isPassed]) => {
      if (isPassed) {
        this.analytics.setCurrentPage(AnalyticsScreenNames.PASS_TEST_SUMMARY);
      } else {
        this.analytics.setCurrentPage(AnalyticsScreenNames.FAIL_TEST_SUMMARY);
      }

      return of();
    }),
  );

  @Effect()
  savingWriteUpForLaterEffect$ = this.actions$.pipe(
    ofType(SAVING_WRITE_UP_FOR_LATER),
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
        AnalyticsEventCategories.POST_TEST,
        AnalyticsEvents.SAVE_WRITE_UP,
        isPassed ? 'pass' : 'fail',
      );

      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.TEST_ID, journalDataOfTest.testSlotAttributes.slotId.toString());
      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId.toString());

      return of();
    }),
  );

  @Effect()
  validationErrorEffect$ = this.actions$.pipe(
    ofType(VALIDATION_ERROR),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(isPassed),
      ),
    ),
    switchMap(([action, isPassed]) => {
      const validationErrorAction = action as ValidationError;
      const screenName = isPassed ? AnalyticsScreenNames.PASS_TEST_SUMMARY : AnalyticsScreenNames.FAIL_TEST_SUMMARY;
      this.analytics.logError(
        `${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`, validationErrorAction.errorMessage);
      console.log('error message,', validationErrorAction.errorMessage);

      return of();
    }),
  );
}
