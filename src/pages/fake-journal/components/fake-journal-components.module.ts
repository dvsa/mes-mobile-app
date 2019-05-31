import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FakeTestSlotComponent } from './fake-test-slot/fake-test-slot';
import { JournalComponentsModule } from '../../journal/components/journal-components.module';

@NgModule({
  declarations: [
    FakeTestSlotComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    JournalComponentsModule,
  ],
  entryComponents:[
    FakeTestSlotComponent,
  ],
  exports:[
    FakeTestSlotComponent,
  ],
})
export class FakeJournalComponentsModule {}
