import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
// import { zip } from 'rxjs/observable/zip';
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
  AnalyticsScreenNames, 
  AnalyticsEventCategories, 
  AnalyticsEvents, 
  AnalyticsDimensionIndices
} from '../../providers/analytics/analytics.model';
import { 
  getSlotById, 
  getSlots, 
  getCandidateName, 
  getCandidateId, 
  getTime, 
  getDetails, 
  isCandidateSpecialNeeds, 
  isCandidateCheckNeeded } from './candidate-details.selector';


interface CandidateDetailsPageState {  
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
  slotChanged: boolean = false;
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
    this.slotChanged = navParams.get('slotChanged');
  }

  ngOnInit(): void {
    this.pageState = {
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

    const { specialNeeds$, entitlementCheck$, candidateId$, name$, time$, details$ } = this.pageState;

    const merged$ = merge(
      name$,
      time$,
      details$.pipe(
        map(details => this.testCategory = details.testCategory.icon as TestCategory)
      ),
      specialNeeds$.pipe(
        map(specialNeeds => this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, specialNeeds ? '1' : '0'))
      ),
      entitlementCheck$,
      candidateId$,
    );

    this.subscription = merged$.subscribe();
    if (this.slotChanged) {
       this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGE_VIEWED, this.slotId.toString());
    }
    this.store$.dispatch(new ClearChangedSlot(this.slotId));
  }

  startAnalytics([specialNeeds, entitlementCheck, candidateId]: any[]): void {
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, candidateId);
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, specialNeeds ? '1' : '0');
    this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_CHECK, entitlementCheck ? '1' : '0');    
    this.analytics.setCurrentPage(AnalyticsScreenNames.CANDIDATE_DETAILS);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ionViewDidEnter(): void {
    // const dimensions$ = zip(
    //   this.pageState.specialNeeds$,
    //   this.pageState.entitlementCheck$, 
    //   this.pageState.candidateId$
    // );

    // dimensions$.subscribe(this.startAnalytics.bind(this));
  }

  handleDoneButtonClick(): void {
    this.navController.pop();
  }

  getCategoryIcon(): string {
    return this.testCategoryIcons[this.testCategory];
  }
}
