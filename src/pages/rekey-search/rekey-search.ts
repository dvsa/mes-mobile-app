import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeySearchViewDidEnter } from './rekey-search.actions';

@IonicPage()
@Component({
  selector: 'page-rekey-search',
  templateUrl: 'rekey-search.html',
})
export class RekeySearchPage extends BasePageComponent {

  subscription: Subscription = Subscription.EMPTY;

  constructor(
    public viewController: ViewController,
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ionViewDidEnter() {
    this.store$.dispatch(new RekeySearchViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
