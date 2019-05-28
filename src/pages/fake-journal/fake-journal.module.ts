import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FakeJournalPage } from './fake-journal';
import { JournalComponentsModule } from '../journal/components/journal-components.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FakeJournalPage,
  ],
  imports: [
    JournalComponentsModule,
    IonicPageModule.forChild(FakeJournalPage),
    ComponentsModule,
  ],
  providers: [
  ],
})
export class FakeJournalPageModule {}
