import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TestSlotComponent } from '../components/test-slot/test-slot';
import { IndicatorsComponent } from '../components/indicators/indicators';
import { TimeComponent } from '../components/time/time';
import { CandidateLinkComponent } from '../components/candidate-link/candidate-link';
import { TestOutcomeComponent } from '../components/test-outcome/test-outcome';
import { TestCategoryComponent } from '../components/test-category/test-category';
import { TestCategoryIconComponent } from '../../../components/test-category-icon/test-category-icon';
import { VehicleDetailsComponent } from '../components/vehicle-details/vehicle-details';

@NgModule({
  declarations: [
    TestSlotComponent,
		IndicatorsComponent,
		TimeComponent,
		CandidateLinkComponent,
    TestOutcomeComponent,
    TestCategoryComponent,
    TestCategoryIconComponent,
    VehicleDetailsComponent
  ],
  entryComponents: [
    TestSlotComponent,
  ],
  imports: [
    IonicModule
  ]
})
export class MockedJournalModule {}
