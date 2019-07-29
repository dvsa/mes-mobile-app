import { JournalForceCheckModal } from './journal-force-check-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    JournalForceCheckModal,
  ],
  imports: [
    IonicPageModule.forChild(JournalForceCheckModal),
    ComponentsModule,
  ],
  exports: [
    JournalForceCheckModal,
  ],
})
export class JournalForceCheckModule { }
