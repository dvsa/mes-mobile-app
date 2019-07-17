import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsDimensionIndices,
} from '../../providers/analytics/analytics.model';
import {
  COMMUNICATION_VIEW_DID_ENTER,
  CommunicationViewDidEnter,
} from './communication.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId, getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { JournalData } from '@dvsa/mes-test-schema/categories/B';
import { get } from 'lodash';

@Injectable()
export class CommunicationAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  communicationViewDidEnter$ = this.actions$.pipe(
    ofType(COMMUNICATION_VIEW_DID_ENTER),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
      ),
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getJournalData),
        ),
    ),
    switchMap(([action, tests, journalData]: [CommunicationViewDidEnter, TestsModel, JournalData]) => {
      const slotId = getCurrentTestSlotId(tests);
      const candidateId = get(journalData, 'candidate.candidateId', '');

      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, `${candidateId}`);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_ID, `${slotId}`);
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.COMMUNICATION, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

}
