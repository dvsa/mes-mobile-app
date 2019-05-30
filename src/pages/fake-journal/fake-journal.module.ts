import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FakeJournalPage } from './fake-journal';
import { JournalComponentsModule } from '../journal/components/journal-components.module';
import { ComponentsModule } from '../../components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { FakeJournalEffects } from './fake-journal.effects';

@NgModule({
  declarations: [
    FakeJournalPage,
  ],
  imports: [
    JournalComponentsModule,
    IonicPageModule.forChild(FakeJournalPage),
    ComponentsModule,
    EffectsModule.forFeature([
      FakeJournalEffects,
    ]),
  ],
  providers: [
  ],
})
export class FakeJournalPageModule {}
