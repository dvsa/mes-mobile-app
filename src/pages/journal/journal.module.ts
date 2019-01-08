import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { TimeComponent } from './components/time/time';
import { CandidateHighlightsComponent } from './components/candidate-highlights/candidate-highlights';
import { TestOutcomeComponent } from './components/test-outcome/test-outcome';
import { TestSlotComponent } from './components/test-slot/test-slot';
import { IndicatorsComponent } from './components/indicators/indicators';
import { JournalProvider } from '../../providers/journal/journal';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details';
import { TestCategoryComponent } from './components/test-category/test-category';

@NgModule({
  declarations: [
    JournalPage,
    IndicatorsComponent,
    TimeComponent,
    CandidateHighlightsComponent,
    TestOutcomeComponent,
    TestSlotComponent,
    TestCategoryComponent,
    VehicleDetailsComponent
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    ComponentsModule,
  ],
  entryComponents: [
    TestSlotComponent
  ],
  providers: [
    JournalProvider,
    SlotSelectorProvider
  ]
})
export class JournalPageModule {}
