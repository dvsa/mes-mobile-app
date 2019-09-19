import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DateTimeProvider } from '../../providers/date-time/date-time';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { JournalProvider } from '../../providers/journal/journal';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalLogsEffects } from './journal.logs.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([
      JournalEffects,
      JournalLogsEffects,
    ]),
  ],
  providers: [
    JournalProvider,
    SlotProvider,
    SlotSelectorProvider,
    DateTimeProvider,
  ],
})
export class JournalModule {}
