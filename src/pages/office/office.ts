import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { OfficeViewDidEnter } from './office.actions';
import { Observable } from 'rxjs/Observable';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { getETA, getETAFaultText, getEco, getEcoFaultText } from '../../modules/tests/test_data/test-data.selector';
import { getTestData } from '../../modules/tests/test_data/test-data.reducer';

interface OfficePageState {
  etaFaults$: Observable<string>;
  ecoFaults$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage extends BasePageComponent {
  pageState: OfficePageState;

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
    this.store$.dispatch(new OfficeViewDidEnter());
  }

  ngOnInit(): void {

    this.pageState = {
      etaFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getETA),
        select(getETAFaultText),
      ),
      ecoFaults$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getEco),
        select(getEcoFaultText),
      ),
    };
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
