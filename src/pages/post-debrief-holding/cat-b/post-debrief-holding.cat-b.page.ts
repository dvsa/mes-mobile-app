import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { PostDebriefHoldingViewDidEnter } from '../post-debrief-holding.actions';

@IonicPage()
@Component({
  selector: '.post-debrief-holding-cat-b-page',
  templateUrl: 'post-debrief-holding.cat-b.page.html',
})
export class PostDebriefHoldingCatBPage extends PracticeableBasePageComponent {

  constructor(
    store$: Store<StoreModel>,
    navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new PostDebriefHoldingViewDidEnter());
  }

}
