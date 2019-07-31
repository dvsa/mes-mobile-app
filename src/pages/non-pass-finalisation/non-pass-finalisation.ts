import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { BACK_TO_OFFICE_PAGE } from '../page-names.constants';

@IonicPage()
@Component({
  selector: 'non-pass-finalisation',
  templateUrl: 'non-pass-finalisation.html',
})
export class NonPassFinalisationPage extends PracticeableBasePageComponent {

  constructor(
    store$: Store<StoreModel>,
    navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  continue() {
    this.navController.push(BACK_TO_OFFICE_PAGE);
  }

}
