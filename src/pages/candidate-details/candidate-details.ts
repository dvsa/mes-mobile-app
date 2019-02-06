import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../common/store.model';
import { TestCategory, testCategoryIcons } from '../../common/test-category';
import { getJournalState } from '../journal/journal.reducer';
import { Details } from './candidate-details.model';
import { ClearChangedSlot } from '../journal/journal.actions';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, AnalyticsDimensionIndices
} from '../../providers/analytics/analytics.model';
import { 
  getSlotById, getSlots, getSlotChanged, getCandidateName, getCandidateId, 
  getTime, getDetails, isCandidateSpecialNeeds, isCandidateCheckNeeded } from './candidate-details.selector';


interface CandidateDetailsPageState {
  slotChanged$: Observable<boolean>,
  specialNeeds$: Observable<boolean>,
  entitlementCheck$: Observable<boolean>,
  candidateId$: Observable<string>,
  name$: Observable<string>,
  time$: Observable<string>,
  details$: Observable<Details>,
};

@IonicPage()
@Component({
  selector: 'page-candidate-details',
  templateUrl: 'candidate-details.html'
})
export class CandidateDetailsPage extends BasePageComponent implements OnInit, OnDestroy {

  pageState: CandidateDetailsPageState;
  subscription: Subscription;
  slotId: number;
  slotChanged: boolean;
  specialNeeds: boolean;
  entitlementCheck: boolean;
  candidateId: string;

  testCategoryIcons = testCategoryIcons;
  testCategory = TestCategory.B;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
    public analytics: AnalyticsProvider
  ) {
    super(platform, navController, authenticationProvider);
    this.slotId = navParams.get('slotId');
  }

  ngOnInit(): void {

    this.pageState = {
      slotChanged$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots=>getSlotById(slots, this.slotId)),
        select(getSlotChanged)
      ),
      specialNeeds$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots=>getSlotById(slots, this.slotId)),
        select(isCandidateSpecialNeeds)
      ),
      entitlementCheck$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots=>getSlotById(slots, this.slotId)),
        select(isCandidateCheckNeeded)
      ),
      candidateId$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots=>getSlotById(slots, this.slotId)),
        select(getCandidateId)
      ),
      name$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getCandidateName)
      ),
      time$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getTime)
      ),
      details$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getDetails)
      ),
    }

    const { slotChanged$, specialNeeds$, entitlementCheck$, candidateId$, name$, time$, details$ } = this.pageState;

    const merged$ = merge(
      name$,
      time$,
      details$.pipe(
        map(details => this.testCategory = details.testCategory.icon as TestCategory)
      ),
      slotChanged$.pipe(map(this.setSlotChanged)),
      specialNeeds$.pipe(map(this.setSpecialNeeds)),
      entitlementCheck$.pipe(map(this.setEntitlementCheck)),
      candidateId$.pipe(map(this.setCandidateId))
    );

    this.subscription = merged$.subscribe();
    if (this.slotChanged) {
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGE_VIEWED, this.slotId.toString());
    }
    this.store$.dispatch(new ClearChangedSlot(this.slotId));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ionViewDidEnter(): void {
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, this.candidateId);
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_CHECK, this.entitlementCheck ? '1' : '0');
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, this.specialNeeds ? '1' : '0');
    this.analytics.setCurrentPage(AnalyticsScreenNames.CANDIDATE_DETAILS);
  }

  setSlotChanged(changed: boolean)
  {
    this.slotChanged = changed;
  }

  setSpecialNeeds(specialNeeds: boolean)
  {
    this.specialNeeds = specialNeeds;
  }

  setEntitlementCheck(check: boolean): void {
    this.entitlementCheck = check;
  }

  setCandidateId(id: string): void {
    this.candidateId = id;
  }

  handleDoneButtonClick(): void {
    this.navController.pop();
  }

  getCategoryIcon(): string {
    return this.testCategoryIcons[this.testCategory];
  }
}
