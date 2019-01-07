import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { JournalSlotComponent } from './journal-components/journal-slot/journal-slot';
import { JournalTestDetailsComponent } from './journal-components/journal-test-details/journal-test-details';
import { JournalIndicatorsComponent } from './journal-components/journal-indicators/journal-indicators';
import { JournalTimeComponent } from './journal-components/journal-time/journal-time';
import { JournalCandidateComponent } from './journal-components/journal-candidate/journal-candidate';
import { JournalTestOutcomeComponent } from './journal-components/journal-test-outcome/journal-test-outcome';

@NgModule({
  declarations: [
    JournalPage,
    JournalTestDetailsComponent,
    JournalIndicatorsComponent,
    JournalTimeComponent,
    JournalCandidateComponent,
    JournalTestOutcomeComponent,
    JournalSlotComponent
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    ComponentsModule,
  ],
  entryComponents: [
    JournalSlotComponent
  ],
  providers: [
    SlotSelectorProvider
  ]
})
export class JournalPageModule {}
