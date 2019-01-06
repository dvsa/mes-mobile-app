import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TestSlotComponent } from '../journal-components/test-slot/test-slot';
import { TestDetailsComponent } from '../journal-components/test-details/test-details';
import { IndicatorsComponent } from '../journal-components/indicators/indicators';
import { TimeComponent } from '../journal-components/time/time';
import { CandidateComponent } from '../journal-components/candidate/candidate';
import { TestOutcomeComponent } from '../journal-components/test-outcome/test-outcome';

@NgModule({
  declarations: [
    TestSlotComponent,
    TestDetailsComponent,
		IndicatorsComponent,
		TimeComponent,
		CandidateComponent,
		TestOutcomeComponent,
  ],
  entryComponents: [
    TestSlotComponent,
  ],
  imports: [
    IonicModule
  ]
})
export class MockedJournalModule {}
