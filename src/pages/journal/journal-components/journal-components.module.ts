import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { JournalTestDetailsComponent } from './journal-test-details/journal-test-details';
import { JournalTestOutcomeComponent } from './journal-test-outcome/journal-test-outcome';
import { JournalTimeComponent} from './journal-time/journal-time';
import { JournalCandidateComponent} from './journal-candidate/journal-candidate';

@NgModule({
	declarations: [
		JournalTestDetailsComponent,
		JournalTestOutcomeComponent, 
		JournalTimeComponent,
		JournalCandidateComponent
	],
	imports: [IonicModule],
	exports: [
		JournalTestDetailsComponent,
		JournalTestOutcomeComponent,
		JournalTimeComponent,
		JournalCandidateComponent
	]
})
export class JournalComponentsModule {}
