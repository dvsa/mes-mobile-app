import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { JournalComponentsModule } from './journal-components/journal-components.module';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { JournalSlotComponent } from './journal-components/journal-slot/journal-slot';

@NgModule({
  declarations: [
    JournalPage,
    JournalSlotComponent
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    JournalComponentsModule,
    ComponentsModule,
  ],
  entryComponents: [JournalSlotComponent],
  providers: [
    SlotSelectorProvider
  ]
})
export class JournalPageModule {}
