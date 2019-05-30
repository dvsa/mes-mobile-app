import { Component } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';
import {
  IonicPage,
  NavController,
  Platform,
  NavParams,
} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Business } from '../../shared/models/DJournal';
import { Details } from '../candidate-details/candidate-details.model';
import { getDetails, getBusiness, getCandidateName, getTime } from '../candidate-details/candidate-details.selector';
import { fakeJournalTestSlots } from '../fake-journal/__mocks__/fake-journal.mock';

@IonicPage()
@Component({
  selector: 'page-fake-candidate-details',
  templateUrl: 'fake-candidate-details.html',
})

export class FakeCandidateDetailsPage extends BasePageComponent {

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

    const slotId = this.navParams.get('slotId');
    console.log('slotId', slotId);
    const slot = fakeJournalTestSlots.find(testSlot => testSlot.slotDetail.slotId === slotId);
    console.log('Slot', slot);

    this.name = getCandidateName(slot);
    this.time = getTime(slot);
    this.details = getDetails(slot);
    this.business = getBusiness(slot);
  }

  specialNeedsIsPopulated(specialNeeds: string | string[]): boolean {
    return Array.isArray(specialNeeds);
  }

}
