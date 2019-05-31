import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FakeTestSlotComponent } from './fake-test-slot/fake-test-slot';

@NgModule({
  declarations: [
    FakeTestSlotComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  entryComponents:[
    FakeTestSlotComponent,
  ],
  exports:[
    FakeTestSlotComponent,
  ],
})
export class JournalComponentsModule {}
