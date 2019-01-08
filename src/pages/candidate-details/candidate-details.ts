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
import { getSlotById, getTestSlots } from './candidate-details.selector';

interface CandidateDetailsPageState {
  slot$: Observable<any>;
}

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
      slot$: this.store$.pipe(
        select(getJournalState),
        select(getTestSlots),
        map((testSlots) => getSlotById(testSlots, this.slotId))
      )
    }

    const { slot$ } = this.pageState;

    const merged$ = merge(
      slot$.pipe(map(slot => { console.log('slot', slot); return slot; }))
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
