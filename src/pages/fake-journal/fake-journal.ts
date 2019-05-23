import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
} from 'ionic-angular';

import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import moment from 'moment';
import { TestSlot } from '../../shared/models/DJournal';
import { fakeJournalTestSlots } from './__mocks__/fake-journal.mock';

@IonicPage()
@Component({
  selector: 'page-fake-journal',
  templateUrl: 'fake-journal.html',
})

export class FakeJournalPage extends BasePageComponent {

  selectedDate: string = moment().toNow();

  slots: TestSlot[] = fakeJournalTestSlots;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

}
