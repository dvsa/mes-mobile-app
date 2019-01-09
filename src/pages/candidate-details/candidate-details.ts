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
import { getJournalState } from '../journal/journal.reducer';
import { getSlotById, getTestSlots, getCandidateName, getTime, getDetails } from './candidate-details.selector';
import { Details } from './candidate-details.model';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.slotId = navParams.get('slotId');
  }

  ngOnInit(): void {
    this.pageState = {
      name$: this.store$.pipe(
        select(getJournalState),
        select(getTestSlots),
        map(testSlots => getSlotById(testSlots, this.slotId)),
        select(getCandidateName)
      ),
      time$: this.store$.pipe(
        select(getJournalState),
        select(getTestSlots),
        map(testSlots => getSlotById(testSlots, this.slotId)),
        select(getTime)
      ),
      details$: this.store$.pipe(
        select(getJournalState),
        select(getTestSlots),
        map(testSlots => getSlotById(testSlots, this.slotId)),
        select(getDetails)
      ),
    }

    const { name$, time$, details$ } = this.pageState;

    const merged$ = merge(
      name$,
      time$,
      details$
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
