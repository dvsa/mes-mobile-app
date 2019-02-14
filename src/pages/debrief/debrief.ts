import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DebriefViewDidEnter } from '../../pages/debrief/debrief.actions';

@IonicPage()
@Component({
  selector: 'page-debrief',
  templateUrl: 'debrief.html',
})
export class DebriefPage extends BasePageComponent {

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch( new DebriefViewDidEnter());
  }

}
