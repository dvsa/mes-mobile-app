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
import { 
  getSlotById, 
  getSlots, 
  getCandidateName, 
  getTime, 
  getDetails, 
} from './candidate-details.selector';
import { 
  CandidateDetailsViewDidEnter, 
  CandidateDetailsSlotChangeViewed 
} from './candidate-details.actions';


interface CandidateDetailsPageState {  
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
  ) {
    super(platform, navController, authenticationProvider);
    this.slotId = navParams.get('slotId');
    this.slotChanged = navParams.get('slotChanged');
  }

  ngOnInit(): void {
    this.pageState = {
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

    const { name$, time$, details$ } = this.pageState;

    const merged$ = merge(
      name$,
      time$,
      details$.pipe(
        map(details => this.testCategory = details.testCategory.icon as TestCategory)
      )
    );

    this.subscription = merged$.subscribe();
    if (this.slotChanged) {
       this.store$.dispatch(new CandidateDetailsSlotChangeViewed(this.slotId));
    }
    this.store$.dispatch(new ClearChangedSlot(this.slotId));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ionViewDidEnter(): void {
    this.store$.dispatch(new CandidateDetailsViewDidEnter(this.slotId));
  }

  handleDoneButtonClick(): void {
    this.navController.pop();
  }

  getCategoryIcon(): string {
    return this.testCategoryIcons[this.testCategory];
  }
}
