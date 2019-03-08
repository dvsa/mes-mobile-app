import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { TestReportViewDidEnter } from './test-report.actions';

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-test-report',
  templateUrl: 'test-report.html',
})
export class TestReportPage extends BasePageComponent {

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
    this.store$.dispatch(new TestReportViewDidEnter());
    this.toggleASAM(true);
  }

  ionViewDidLeave(): void {
    this.toggleASAM(false);
  }

  toggleASAM(enabled: boolean) {
    if (cordova && cordova.plugins && cordova.plugins.ASAM) {
      cordova.plugins.ASAM.toggle(enabled, (didSucceed: Boolean) => {
        console.log(`Call to ${enabled ? 'enable' : 'disable'} ASAM ${didSucceed ? 'succeeded' : 'failed'}`);
      });
    }
  }
}
