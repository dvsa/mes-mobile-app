import { Component } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';
import {
  IonicPage,
  NavController,
  Platform,
  NavParams,
} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Business, TestSlot } from '@dvsa/mes-journal-schema';
import { Details } from '../candidate-details/candidate-details.model';
import { getDetails, getBusiness, getCandidateName, getTime } from '../candidate-details/candidate-details.selector';

@IonicPage()
@Component({
  selector: 'page-fake-candidate-details',
  templateUrl: 'fake-candidate-details.html',
})

export class FakeCandidateDetailsPage extends BasePageComponent {

  slot: TestSlot;

  name: string;
  time: string;
  details: Details;
  business: Business;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public navParams: NavParams,
  ) {
    super(platform, navController, authenticationProvider);
    this.slot = this.navParams.get('slot');
  }

  ngOnInit(): void {
    this.name = getCandidateName(this.slot);
    this.time = getTime(this.slot);
    this.details = getDetails(this.slot);
    this.business = getBusiness(this.slot);
  }

  specialNeedsIsPopulated(specialNeeds: string | string[]): boolean {
    return Array.isArray(specialNeeds);
  }

}
