import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { TestDetailsComponent } from './journal-components/test-details/test-details';
import { TimeComponent } from './journal-components/time/time';
import { CandidateComponent } from './journal-components/candidate/candidate';
import { TestOutcomeComponent } from './journal-components/test-outcome/test-outcome';
import { TestSlotComponent } from './journal-components/test-slot/test-slot';
import { IndicatorsComponent } from './journal-components/indicators/indicators';

@NgModule({
  declarations: [
    JournalPage,
    TestDetailsComponent,
    IndicatorsComponent,
    TimeComponent,
    CandidateComponent,
    TestOutcomeComponent,
    TestSlotComponent
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
    SlotSelectorProvider
  ]
})
export class JournalPageModule {}
