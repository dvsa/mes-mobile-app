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
import { IndicatorsComponent } from './components/indicators/indicators';
import { JournalProvider } from '../../providers/journal/journal';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details';
import { TestCategoryComponent } from './components/test-category/test-category';
import { JournalNavigationComponent } from './components/journal-navigation/journal-navigation';
// import { AnalyticsEffects } from '../../providers/analytics/analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalAnalyticsEffects } from './journal.analytics.effects';

@NgModule({
  declarations: [
    JournalPage,
    IndicatorsComponent,
    TimeComponent,
    CandidateLinkComponent,
    TestOutcomeComponent,
    TestSlotComponent,
    ActivitySlotComponent,
    TestCategoryComponent,
    VehicleDetailsComponent,
    JournalNavigationComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([JournalEffects, JournalAnalyticsEffects]),
    ComponentsModule,
  ],
  entryComponents: [
    TestSlotComponent,
    ActivitySlotComponent,
  ],
  providers: [
    JournalProvider,
    SlotProvider,
    SlotSelectorProvider,
    AnalyticsProvider
  ]
})
export class JournalPageModule {}
