import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { PassFinalisationViewDidEnter } from './pass-finalisation.actions';

@IonicPage()
@Component({
  selector: 'page-pass-finalisation',
  templateUrl: 'pass-finalisation.html',
})
export class PassFinalisationPage extends BasePageComponent {

  // Used for now to test displaying pass/fail ngIf messages
  public passed: boolean = false;

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
    this.store$.dispatch(new PassFinalisationViewDidEnter());
  }

}
