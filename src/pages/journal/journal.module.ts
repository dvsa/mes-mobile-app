import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { JournalProvider } from '../../providers/journal/journal';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalAnalyticsEffects } from './journal.analytics.effects';
import { JournalLogsEffects } from './journal.logs.effects';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { JournalComponentsModule } from './components/journal-components.module';

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    JournalComponentsModule,
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([
      JournalEffects,
      JournalAnalyticsEffects,
      JournalLogsEffects,
    ]),
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
