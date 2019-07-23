import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../shared/models/store.model';
import { TestCategory } from '../../shared/models/test-category';
import { getJournalState } from '../journal/journal.reducer';
import { Details } from './candidate-details.model';
import {
  ClearChangedSlot,
  CandidateDetailsSeen,
} from '../journal/journal.actions';
import {
  getSlotById,
  getSlots,
  getCandidateName,
  getTime,
  getDetails,
  getBusiness,
} from './candidate-details.selector';
import {
  CandidateDetailsViewDidEnter,
  CandidateDetailsSlotChangeViewed,
} from './candidate-details.actions';
import { Business } from '@dvsa/mes-journal-schema';
import { getCheckComplete } from '../journal/journal.selector';

interface CandidateDetailsPageState {
  name$: Observable<string>;
  time$: Observable<string>;
  details$: Observable<Details>;
  business$: Observable<Business>;
  checkComplete$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-candidate-details',
  templateUrl: 'candidate-details.html',
})
export class CandidateDetailsPage extends BasePageComponent implements OnInit {
  pageState: CandidateDetailsPageState;
  subscription: Subscription;
  slotId: number;
  slotChanged: boolean = false;
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
    this.store$.dispatch(new ClearChangedSlot(this.slotId));

    this.pageState = {
      name$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getCandidateName),
      ),
      time$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getTime),
      ),
      details$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getDetails),
      ),
      business$: this.store$.pipe(
        select(getJournalState),
        select(getSlots),
        map(slots => getSlotById(slots, this.slotId)),
        select(getBusiness),
      ),
      checkComplete$: this.store$.pipe(
        select(getJournalState),
        map(journalData => getCheckComplete(journalData, this.slotId)),
      ),
    };

    const { name$, time$, details$, business$ } = this.pageState;

    const merged$ = merge(
      name$,
      time$,
      details$.pipe(
        map(details => this.testCategory = details.testCategory as TestCategory),
      ),
      business$,
    );

    this.subscription = merged$.subscribe();

    if (this.slotChanged) {
      this.store$.dispatch(new CandidateDetailsSlotChangeViewed(this.slotId));
    }
    this.store$.dispatch(new ClearChangedSlot(this.slotId));
    this.pageState.checkComplete$.subscribe(
      (result) => {
        if (!result) {
          this.store$.dispatch(new CandidateDetailsSeen(this.slotId));
        }
      },
    );
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new CandidateDetailsViewDidEnter(this.slotId));
  }

  handleDoneButtonClick(): void {
    this.navController.pop();
  }

  public specialNeedsIsPopulated(specialNeeds: string | string[]): boolean {
    return Array.isArray(specialNeeds);
  }
}
