import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { PostDebriefHoldingViewDidEnter } from '../post-debrief-holding.actions';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { BasePageComponent } from '../../../shared/classes/base-page';

@IonicPage()
@Component({
  selector: '.post-debrief-holding-cat-cpc-page',
  templateUrl: 'post-debrief-holding.cat-cpc.page.html',
})
export class PostDebriefHoldingCatCPCPage extends BasePageComponent {

  constructor(
    public store$: Store<StoreModel>,
    navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new PostDebriefHoldingViewDidEnter());
  }

}
