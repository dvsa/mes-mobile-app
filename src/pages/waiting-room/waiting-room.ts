import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import * as waitingRoomActions from './waiting-room.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { getPreTestDeclarationsState } from '../../modules/test/pre-test-declarations/pre-test-declarations.reducer';
import * as preTestDeclarationsActions from '../../modules/test/pre-test-declarations/pre-test-declarations.actions';
import {
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
} from '../../modules/test/pre-test-declarations/pre-test-declarations.selector';

interface WaitingRoomPageState {
  insuranceDeclarationAccepted$: Observable<boolean>;
  residencyDeclarationAccepted$: Observable<boolean>;
  signature$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-waiting-room',
  templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage extends BasePageComponent {
  @ViewChild(MesSignaturePadComponent)
  signaturePad: MesSignaturePadComponent;

  pageState: WaitingRoomPageState;

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
    this.store$.dispatch(new waitingRoomActions.WaitingRoomViewDidEnter());
  }

  ngOnInit(): void {
    this.pageState = {
      insuranceDeclarationAccepted$: this.store$.pipe(
        select(getPreTestDeclarationsState),
        select(getInsuranceDeclarationStatus),
      ),
      residencyDeclarationAccepted$: this.store$.pipe(
        select(getPreTestDeclarationsState),
        select(getResidencyDeclarationStatus),
      ),
      signature$: of(''),
    };
  }

  insuranceDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleInsuranceDeclaration());
  }

  residencyDeclarationChanged(): void {
    this.store$.dispatch(new preTestDeclarationsActions.ToggleResidencyDeclaration());
  }

}
