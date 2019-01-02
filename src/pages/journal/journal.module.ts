import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from '../../effects/journal.effects';

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    ComponentsModule,
  ],
})
export class JournalPageModule {}
