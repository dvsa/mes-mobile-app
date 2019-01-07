import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TestSlotComponent } from '../components/test-slot/test-slot';
import { TestDetailsComponent } from '../components/test-details/test-details';
import { IndicatorsComponent } from '../components/indicators/indicators';
import { TimeComponent } from '../components/time/time';
import { CandidateComponent } from '../components/candidate/candidate';
import { TestOutcomeComponent } from '../components/test-outcome/test-outcome';

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
