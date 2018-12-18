import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { JournalTestDetailsComponent } from './journal-test-details/journal-test-details';
import { JournalTestOutcomeComponent } from './journal-test-outcome/journal-test-outcome';

@NgModule({
	declarations: [JournalTestDetailsComponent, JournalTestOutcomeComponent ],
	imports: [IonicModule],
	exports: [JournalTestDetailsComponent, JournalTestOutcomeComponent]
})
export class JournalComponentsModule {}
