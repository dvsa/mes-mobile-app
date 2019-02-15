import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from '../journal/journal.reducer';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
    AnalyticsDimensionIndices,
    AnalyticsScreenNames,
    AnalyticsEventCategories,
    AnalyticsEvents,
} from '../../providers/analytics/analytics.model';

import {
    getSlotById,
    getSlots,
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
    candidateView$ = this.actions$.pipe(
    ofType(CANDIDATE_DETAILS_VIEW_DID_ENTER),
    withLatestFrom(
        this.store$.pipe(
          select(getJournalState),
          map(getSlots),
        ),
    ),
    switchMap(([action, slots]: [CandidateDetailsViewDidEnter, any[]]) => {
      const slot = getSlotById(slots, action.slotId);
      const specNeeds = isCandidateSpecialNeeds(slot);
      const candidateCheck = isCandidateCheckNeeded(slot);
      const candidateId = getCandidateId(slot);

      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, candidateId);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, specNeeds ? '1' : '0');
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_CHECK, candidateCheck ? '1' : '0');
      this.analytics.setCurrentPage(AnalyticsScreenNames.CANDIDATE_DETAILS);
      return of();
    }),
    );

  @Effect()
    slotChangeViewed$ = this.actions$.pipe(
    ofType(CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED),
    switchMap((action: CandidateDetailsSlotChangeViewed) => {
      console.log('slot change viewed');
      this.analytics.logEvent(
        AnalyticsEventCategories.JOURNAL,
        AnalyticsEvents.SLOT_CHANGE_VIEWED,
        action.slotId.toString());
      return of();
    }),
    );
}
