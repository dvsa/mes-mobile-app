import { NgModule } from '@angular/core';
import { JournalSlotComponent } from '../journal-components/journal-slot/journal-slot';
import { JournalTestDetailsComponent } from '../journal-components/journal-test-details/journal-test-details';
import { JournalIndicatorsComponent } from '../journal-components/journal-indicators/journal-indicators';
import { JournalTimeComponent } from '../journal-components/journal-time/journal-time';
import { JournalCandidateComponent } from '../journal-components/journal-candidate/journal-candidate';
import { JournalTestOutcomeComponent } from '../journal-components/journal-test-outcome/journal-test-outcome';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    JournalSlotComponent,
    JournalTestDetailsComponent,
		JournalIndicatorsComponent,
		JournalTimeComponent,
		JournalCandidateComponent,
		JournalTestOutcomeComponent,
    JournalSlotComponent
  ],
  entryComponents: [
    JournalSlotComponent,
  ],
  imports: [
    IonicModule
  ]
})
export class MockedJournalModule {}
