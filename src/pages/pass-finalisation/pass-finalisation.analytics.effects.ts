import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
  AnalyticsErrorTypes,
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../providers/analytics/analytics.model';
import {
  PASS_FINALISTATION_VIEW_DID_ENTER,
  PassFinalisationViewDidEnter,
  PASS_FINALISTATION_VALIDATION_ERROR,
  PassFinalisationValidationError,
} from './pass-finalisation.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import * as passCompletionActions from '../../modules/tests/pass-completion/pass-completion.actions';
import * as testSummaryActions from '../../modules/tests/test-summary/test-summary.actions';

@Injectable()
export class PassFinalisationAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  passFinalisationViewDidEnter$ = this.actions$.pipe(
    ofType(PASS_FINALISTATION_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      )),
    ),
    switchMap(([action, tests]: [PassFinalisationViewDidEnter, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.PASS_FINALISATION, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  validationErrorEffect$ = this.actions$.pipe(
    ofType(PASS_FINALISTATION_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      )),
    ),
    switchMap(([action, tests]: [PassFinalisationValidationError, TestsModel]) => {
      const formattedScreenName = formatAnalyticsText(AnalyticsScreenNames.PASS_FINALISATION, tests);
      this.analytics.logError(
        `${AnalyticsErrorTypes.VALIDATION_ERROR} (${formattedScreenName})`,
        action.errorMessage,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  code78PresentEffect$ = this.actions$.pipe(
    ofType(passCompletionActions.CODE_78_PRESENT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [passCompletionActions.Code78Present, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_CODE_78, tests),
        'Yes',
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  code78NotPresentEffect$ = this.actions$.pipe(
    ofType(passCompletionActions.CODE_78_NOT_PRESENT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [passCompletionActions.Code78NotPresent, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_CODE_78, tests),
        'No',
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  provisionalLicenseNotReceived$ = this.actions$.pipe(
    ofType(passCompletionActions.PROVISIONAL_LICENSE_NOT_RECEIVED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [passCompletionActions.ProvisionalLicenseNotReceived, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LICENSE_RECEIVED, tests),
        'No',
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  provisionalLicenseReceived$ = this.actions$.pipe(
    ofType(passCompletionActions.PROVISIONAL_LICENSE_RECEIVED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [passCompletionActions.ProvisionalLicenseReceived, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LICENSE_RECEIVED, tests),
        'Yes',
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  d255Yes$ = this.actions$.pipe(
    ofType(testSummaryActions.D255_YES),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testSummaryActions.D255Yes, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.D255, tests),
        'Yes',
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  d255No$ = this.actions$.pipe(
    ofType(testSummaryActions.D255_NO),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testSummaryActions.D255No, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests),
        formatAnalyticsText(AnalyticsEvents.D255, tests),
        'No',
      );
      return of(new AnalyticRecorded());
    }),
  );

}
