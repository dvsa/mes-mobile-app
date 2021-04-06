import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
} from 'ionic-angular';

import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as moment from 'moment';
import { fakeJournalTestSlots } from './__mocks__/fake-journal.mock';
import { end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';

@IonicPage()
@Component({
  selector: 'page-fake-journal',
  templateUrl: 'fake-journal.html',
})

export class FakeJournalPage extends BasePageComponent {

  dateToDisplay: string;

  fakeSlotData = fakeJournalTestSlots;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider);

    this.dateToDisplay = moment().format('dddd D MMMM YYYY');
  }

  isRedLineSlot = (slotId: string) => slotId === `${end2endPracticeSlotId}_2`;
}
