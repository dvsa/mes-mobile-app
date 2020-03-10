import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
    AnalyticsDimensionIndices,
    AnalyticsScreenNames,
    AnalyticsEventCategories,
    AnalyticsEvents,
} from '../../providers/analytics/analytics.model';

import {
    isCandidateSpecialNeeds,
    getCandidateId,
    isCandidateCheckNeeded,
} from './candidate-details.selector';

import {
  CANDIDATE_DETAILS_VIEW_DID_ENTER,
  CandidateDetailsViewDidEnter,
  CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED,
  CandidateDetailsSlotChangeViewed,
} from './candidate-details.actions';

@Injectable()
export class CandidateDetailsAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
  }

  @Effect()
    candidateView$ = this.actions$.pipe(
      ofType(CANDIDATE_DETAILS_VIEW_DID_ENTER),
      switchMap((action: CandidateDetailsViewDidEnter) => {
        const specNeeds = isCandidateSpecialNeeds(action.slot);
        const candidateCheck = isCandidateCheckNeeded(action.slot);
        const candidateId = getCandidateId(action.slot);

        this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, candidateId);
        this.analytics.addCustomDimension(
          AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, specNeeds ? '1' : '0');
        this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_CHECK, candidateCheck ? '1' : '0');
        this.analytics.setCurrentPage(AnalyticsScreenNames.CANDIDATE_DETAILS);
        return of();
      }),
    );

  @Effect()
    slotChangeViewed$ = this.actions$.pipe(
      ofType(CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED),
      switchMap((action: CandidateDetailsSlotChangeViewed) => {
        this.analytics.logEvent(
          AnalyticsEventCategories.JOURNAL,
          AnalyticsEvents.SLOT_CHANGE_VIEWED,
          action.slotId.toString());
        return of();
      }),
    );
}
