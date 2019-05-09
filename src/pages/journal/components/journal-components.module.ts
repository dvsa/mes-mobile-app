import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TimeComponent } from '../components/time/time';
import { CandidateLinkComponent } from '../components/candidate-link/candidate-link';
import { TestOutcomeComponent } from '../components/test-outcome/test-outcome';
import { ActivitySlotComponent } from '../components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../components/empty-slot/empty-slot';
import { LocationComponent } from '../components/location/location';
import { IndicatorsComponent } from '../components/indicators/indicators';
import { VehicleDetailsComponent } from '../components/vehicle-details/vehicle-details';
import { TestCategoryComponent } from '../components/test-category/test-category';
import { JournalNavigationComponent } from '../components/journal-navigation/journal-navigation';
import { LanguageComponent } from '../components/language/language';
import { TestSlotComponent } from './test-slot/test-slot';
import { PracticeCardComponent } from './practice-card/practice-card';

@NgModule({
  declarations: [
    TimeComponent,
    CandidateLinkComponent,
    TestOutcomeComponent,
    TestSlotComponent,
    ActivitySlotComponent,
    EmptySlotComponent,
    LocationComponent,
    IndicatorsComponent,
    VehicleDetailsComponent,
    TestCategoryComponent,
    JournalNavigationComponent,
    LanguageComponent,
    PracticeCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  entryComponents:[
    TestSlotComponent,
  ],
  exports:[
    TimeComponent,
    CandidateLinkComponent,
    TestOutcomeComponent,
    TestSlotComponent,
    ActivitySlotComponent,
    EmptySlotComponent,
    LocationComponent,
    IndicatorsComponent,
    VehicleDetailsComponent,
    TestCategoryComponent,
    JournalNavigationComponent,
    LanguageComponent,
    PracticeCardComponent,
  ],
})
export class JournalComponentsModule {}
