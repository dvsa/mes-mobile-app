import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { PostDebriefHoldingViewDidEnter } from '../post-debrief-holding.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';

@IonicPage()
@Component({
  selector: '.post-debrief-holding-cat-adi-part2-page',
  templateUrl: 'post-debrief-holding.cat-adi-part2.page.html',
})
export class PostDebriefHoldingCatADIPart2Page extends BasePageComponent {

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
