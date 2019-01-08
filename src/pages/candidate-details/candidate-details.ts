import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../common/store.model';

@IonicPage()
@Component({
  selector: 'page-candidate-details',
  templateUrl: 'candidate-details.html'
})
export class CandidateDetailsPage extends BasePageComponent implements OnInit, OnDestroy {

  slotId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider
    // private store$: Store<StoreModel>
  ) {
    super(platform, navCtrl, authenticationProvider);

    this.slotId = navParams.get('slotId');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
