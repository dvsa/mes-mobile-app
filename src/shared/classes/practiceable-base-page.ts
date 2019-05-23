import { Platform, NavController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';

import { BasePageComponent } from './base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { isPracticeMode } from '../../modules/tests/tests.selector';
import { OnInit, OnDestroy } from '@angular/core';

interface PracticeableBasePageState {
  isPracticeMode$: Observable<boolean>;
}

export abstract class PracticeableBasePageComponent extends BasePageComponent implements OnInit, OnDestroy {

  practiceableBasePageState: PracticeableBasePageState;
  subscription: Subscription;

  isPracticeMode: boolean;

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationProvider: AuthenticationProvider,
    public loginRequired: boolean = true,
    private store$: Store<StoreModel>,
  ) {
    super(platform, navController, authenticationProvider, loginRequired);
  }

  ngOnInit(): void {
    this.practiceableBasePageState = {
      isPracticeMode$: this.store$.pipe(
        select(getTests),
        select(isPracticeMode),
      ),
    };

    const {
      isPracticeMode$,
    } = this.practiceableBasePageState;

    const merged$ = merge(
      isPracticeMode$.pipe(map(value => this.isPracticeMode = value)),
    );
    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
