import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from '../../pages/journal/journal.reducer';
import { AnalyticsProvider } from './analytics';
import {
  getSlotById,
  getSlots, 
  isCandidateSpecialNeeds,
  getCandidateId,
  isCandidateCheckNeeded
} from '../../pages/candidate-details/candidate-details.selector';
import { 
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents
} from './analytics.model'
import { 
  CANDIDATE_DETAILS_VIEW_DID_ENTER, 
  CandidateDetailsViewDidEnter, 
  CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED,
  CandidateDetailsSlotChangeViewed} from '../../pages/candidate-details/candidate-details.actions';
import { 
  JOURNAL_VIEW_DID_ENTER, 
  JOURNAL_NAVIGATE_DAY, 
  JournalNavigateDay, 
  JOURNAL_REFRESH, 
  JournalRefresh,
  JOURNAL_REFRESH_ERROR, 
  JournalRefreshError } from '../../pages/journal/journal.actions';
import { 
  SLOT_HAS_CHANGED, 
  SlotHasChanged 
} from '../slot/slot.actions';
import { 
  DEBRIEF_VIEW_DID_ENTER, 
  DebriefViewDidEnter 
} from '../../pages/debrief/debrief.actions';
import { 
  TEST_OUTCOME_START_TEST, 
  TestOutcomeStartTest 
} from '../../pages/journal/components/test-outcome/test-outcome.actions';
import { 
  HEALTH_DECLARATION_VIEW_DID_ENTER, 
  HealthDeclarationViewDidEnter 
} from '../../pages/health-declaration/health-declaration.actions';
import { 
  OFFICE_VIEW_DID_ENTER, 
  OfficeViewDidEnter 
} from '../../pages/office/office.actions';
import { 
  PASS_FINALISTATION_VIEW_DID_ENTER, 
  PassFinalisationViewDidEnter 
} from '../../pages/pass-finalisation/pass-finalisation.actions';
import { 
  TERMINATE_TEST_VIEW_DID_ENTER, 
  TerminateTestViewDidEnter 
} from '../../pages/terminate-test/terminate-test.actions';
import { 
  TEST_REPORT_VIEW_DID_ENTER, 
  TestReportViewDidEnter 
} from '../../pages/test-report/test-report.actions';
import { 
  WAITING_ROOM_TO_CAR_VIEW_DID_ENTER, 
  WaitingRoomToCarViewDidEnter 
} from '../../pages/waiting-room-to-car/waiting-room-to-car.actions';
import { WAITING_ROOM_VIEW_DID_ENTER, WaitingRoomViewDidEnter } from '../../pages/waiting-room/waiting-room.actions';

@Injectable()
export class AnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => { 
            console.log('error initialising analytics')
          }
    );
  }
  
  @Effect()
  candidateView$ = this.actions$.pipe(
    ofType(CANDIDATE_DETAILS_VIEW_DID_ENTER),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSlots),
      ) 
    ),
    switchMap(([action, slots]: [CandidateDetailsViewDidEnter, any[]]) => {
      const slot = getSlotById(slots, action.slotId)
      const specNeeds = isCandidateSpecialNeeds(slot);
      const candidateCheck = isCandidateCheckNeeded(slot);
      const candidateId = getCandidateId(slot);

      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, candidateId);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, specNeeds ? '1' : '0');
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_CHECK, candidateCheck ? '1' : '0');    
      this.analytics.setCurrentPage(AnalyticsScreenNames.CANDIDATE_DETAILS);
      return of();
    })
  );

  @Effect()
  candidateSlotChangeViewed$ = this.actions$.pipe(
    ofType(CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED),
    switchMap( (action: CandidateDetailsSlotChangeViewed) => {
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGE_VIEWED, action.slotId.toString());
      return of();
    })
  );

  
  @Effect()
  journalView$ = this.actions$.pipe(
    ofType(JOURNAL_VIEW_DID_ENTER),
    switchMap(
      () => {
        this.analytics.setCurrentPage(AnalyticsScreenNames.JOURNAL);
        return of();
      }
    )
  );

  @Effect()
  journalNavigation$ = this.actions$.pipe(
    ofType(JOURNAL_NAVIGATE_DAY),
    switchMap(
      (action: JournalNavigateDay) => {
        this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, this.analytics.getDescriptiveDate(action.day));
        this.analytics.addCustomDimension(AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY, this.analytics.getDiffDays(action.day).toString());
        this.analytics.setCurrentPage(`${this.analytics.getDescriptiveDate(action.day)} ${AnalyticsScreenNames.JOURNAL}`);

        return of();
      }
    )
  );

  @Effect()
  journalRefresh$ = this.actions$.pipe(
    ofType(JOURNAL_REFRESH),
    switchMap(
      (action: JournalRefresh) => {
        this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.REFRESH_JOURNAL, action.mode);
        return of();
      }
    )
  );

  @Effect()
  journalRefreshError$ = this.actions$.pipe(
    ofType(JOURNAL_REFRESH_ERROR),
    switchMap(
      (action: JournalRefreshError) => {
        this.analytics.logError(action.errorDescription, action.errorMessage);
        return of();
      }
    )
  );

  @Effect()
  slotChanged$ = this.actions$.pipe(
    ofType(SLOT_HAS_CHANGED),
    switchMap(
      (action: SlotHasChanged) => {
        this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGED, action.slotId.toString());
        return of();
      }
    )
  );

  @Effect()
  debriefViewDidEnter$ = this.actions$.pipe(
    ofType(DEBRIEF_VIEW_DID_ENTER),
    switchMap( (action: DebriefViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.DEBRIEF);
      return of();
    })
  );

  @Effect()
  testOutcomeStartTest$ = this.actions$.pipe(
    ofType(TEST_OUTCOME_START_TEST),
    switchMap( (action: TestOutcomeStartTest) => {
      this.analytics.logEvent(AnalyticsEventCategories.CLICK, AnalyticsEvents.START_TEST);
      return of();
    })
  );

  @Effect()
  healthDeclarationViewDidEnter$ = this.actions$.pipe(
    ofType(HEALTH_DECLARATION_VIEW_DID_ENTER),
    switchMap( (action: HealthDeclarationViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.HEALTH_DECLARATION);
      return of();
    })
  );

  @Effect()
  officeViewDidEnter$ = this.actions$.pipe(
    ofType(OFFICE_VIEW_DID_ENTER),
    switchMap( (action: OfficeViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.OFFICE);
      return of();
    })
  );

  @Effect()
  passFinalisationViewDidEnter$ = this.actions$.pipe(
    ofType(PASS_FINALISTATION_VIEW_DID_ENTER),
    switchMap( (action: PassFinalisationViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.PASS_FINALISATION);
      return of();
    })
  );

  @Effect()
  terminateTestViewDidEnter$ = this.actions$.pipe(
    ofType(TERMINATE_TEST_VIEW_DID_ENTER),
    switchMap( (action: TerminateTestViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TERMINATE_TEST);
      return of();
    })
  );

  @Effect()
  testReportViewDidEnter$ = this.actions$.pipe(
    ofType(TEST_REPORT_VIEW_DID_ENTER),
    switchMap( (action: TestReportViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TEST);
      return of();
    })
  );

  @Effect()
  waitingRoomToCarViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_TO_CAR_VIEW_DID_ENTER),
    switchMap( (action: WaitingRoomToCarViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM_TO_CAR);
      return of();
    })
  );

  @Effect()
  waitingRoomViewDidEnter$ = this.actions$.pipe(
    ofType(WAITING_ROOM_VIEW_DID_ENTER),
    switchMap( (action: WaitingRoomViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.WAITING_ROOM);
      return of();
    })
  );

}