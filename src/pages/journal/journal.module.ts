import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { ActivitySlotComponent } from './components/activity-slot/activity-slot';
import { EmptySlotComponent } from './components/empty-slot/empty-slot';
import { JournalProvider } from '../../providers/journal/journal';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalAnalyticsEffects } from './journal.analytics.effects';
import { JournalLogsEffects } from './journal.logs.effects';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { JournalComponentsModule } from './components/journal-components.module';
import { TestsEffects } from '../../modules/tests/tests.effects';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    JournalComponentsModule,
    TestSlotComponentsModule,
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([
      JournalEffects,
      JournalAnalyticsEffects,
      JournalLogsEffects,
      TestsEffects,
    ]),
    ComponentsModule,
  ],
  entryComponents: [
    ActivitySlotComponent,
    EmptySlotComponent,
  ],
  providers: [
    JournalProvider,
    SlotProvider,
    SlotSelectorProvider,
    AnalyticsProvider,
    DateTimeProvider,
  ],
})
export class JournalPageModule {}
