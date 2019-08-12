import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FakeTestSlotComponent } from './fake-test-slot/fake-test-slot';
import { JournalComponentsModule } from '../../journal/components/journal-components.module';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';

@NgModule({
  declarations: [
    FakeTestSlotComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    JournalComponentsModule,
    TestSlotComponentsModule,
  ],
  entryComponents:[
    FakeTestSlotComponent,
  ],
  exports:[
    FakeTestSlotComponent,
  ],
})
export class FakeJournalComponentsModule {}
