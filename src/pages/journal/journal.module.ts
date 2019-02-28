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
import { CandidateLinkComponent } from './components/candidate-link/candidate-link';
import { TestOutcomeComponent } from './components/test-outcome/test-outcome';
import { TestSlotComponent } from './components/test-slot/test-slot';
import { ActivitySlotComponent } from './components/activity-slot/activity-slot';
import { EmptySlotComponent } from './components/empty-slot/empty-slot';
import { LocationComponent } from './components/location/location';
import { IndicatorsComponent } from './components/indicators/indicators';
import { JournalProvider } from '../../providers/journal/journal';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details';
import { TestCategoryComponent } from './components/test-category/test-category';
import { JournalNavigationComponent } from './components/journal-navigation/journal-navigation';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalAnalyticsEffects } from './journal.analytics.effects';
import { LanguageComponent } from './components/language/language';
import { JournalLogsEffects } from './journal.logs.effects';

@NgModule({
  declarations: [
    JournalPage,
    IndicatorsComponent,
    LanguageComponent,
    TimeComponent,
    CandidateLinkComponent,
    TestOutcomeComponent,
    TestSlotComponent,
    ActivitySlotComponent,
    EmptySlotComponent,
    LocationComponent,
    TestCategoryComponent,
    VehicleDetailsComponent,
    JournalNavigationComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([
      JournalEffects,
      JournalAnalyticsEffects,
      JournalLogsEffects,
    ]),
    ComponentsModule,
  ],
  entryComponents: [
    TestSlotComponent,
    ActivitySlotComponent,
    EmptySlotComponent,
  ],
  providers: [
    JournalProvider,
    SlotProvider,
    SlotSelectorProvider,
    AnalyticsProvider,
  ],
})
export class JournalPageModule {}
