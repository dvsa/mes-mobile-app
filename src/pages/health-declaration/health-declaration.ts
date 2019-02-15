import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../classes/base-page';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { HealthDeclarationViewDidEnter } from './health-declaration.actions';

@IonicPage()
@Component({
  selector: 'page-health-declaration',
  templateUrl: 'health-declaration.html',
})
export class HealthDeclarationPage extends BasePageComponent {

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
    this.store$.dispatch(new HealthDeclarationViewDidEnter());
  }

}
