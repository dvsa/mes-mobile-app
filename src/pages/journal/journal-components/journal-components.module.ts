import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { JournalTestDetailsComponent } from './journal-test-details/journal-test-details';
import { JournalIndicatorsComponent } from './journal-indicators/journal-indicators';
import { JournalTimeComponent } from './journal-time/journal-time';
import { JournalCandidateComponent } from './journal-candidate/journal-candidate';
import { JournalTestOutcomeComponent } from './journal-test-outcome/journal-test-outcome';
import { JournalSlotComponent } from './journal-slot/journal-slot';

@NgModule({
	declarations: [
		JournalTestDetailsComponent,
		JournalIndicatorsComponent,
		JournalTimeComponent,
		JournalCandidateComponent,
		JournalTestOutcomeComponent,
		JournalSlotComponent
	],
	imports: [IonicModule],
	exports: [
		JournalTestDetailsComponent,
		JournalIndicatorsComponent,
		JournalTimeComponent,
		JournalCandidateComponent,
		JournalTestOutcomeComponent,
		JournalSlotComponent
  ],
})
export class JournalComponentsModule {}
