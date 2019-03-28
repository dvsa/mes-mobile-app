import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DebriefViewDidEnter } from '../../pages/debrief/debrief.actions';

@IonicPage()
@Component({
  selector: 'page-debrief',
  templateUrl: 'debrief.html',
})
export class DebriefPage extends BasePageComponent {

  // Used for now to test displaying pass/fail ngIf messages
  public passed: boolean = true;

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
    this.store$.dispatch(new DebriefViewDidEnter());
  }

  endDebrief(): void {
    if (this.passed) {
      this.navController.push('PassFinalisationPage');
    }else {
      this.navController.push('OfficePage');
    }
  }

}
