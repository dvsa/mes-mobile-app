import { Component } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';

import {
  IonicPage,
  NavController,
  Platform,
} from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-fake-candidate-details',
  templateUrl: 'fake-candidate-details.html',
})

export class FakeCandidateDetailsPage extends BasePageComponent {

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

}
