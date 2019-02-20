import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { WaitingRoomViewDidEnter } from './waiting-room.actions';
import { AppPreferences } from '@ionic-native/app-preferences';

@IonicPage()
@Component({
  selector: 'page-waiting-room',
  templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage extends BasePageComponent {

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private appPreferences: AppPreferences,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new WaitingRoomViewDidEnter());
    this.appPreferences.fetch('configUrl').then((res) => {
      console.log('CONFIG URL', res);
    });
  }

}
