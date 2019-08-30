import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FakeJournalPage } from './fake-journal';
import { JournalComponentsModule } from '../journal/components/journal-components.module';
import { ComponentsModule } from '../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { FakeJournalEffects } from './fake-journal.effects';
import { FakeJournalComponentsModule } from './components/fake-journal-components.module';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { JournalPageModule } from '../journal/journal.module';

@NgModule({
  declarations: [
    FakeJournalPage,
  ],
  imports: [
    JournalPageModule,
    FakeJournalComponentsModule,
    JournalComponentsModule,
    TestSlotComponentsModule,
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
