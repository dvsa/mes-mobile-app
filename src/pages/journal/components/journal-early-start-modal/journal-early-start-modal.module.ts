import { ComponentsModule } from '../../../../components/common/common-components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEarlyStartModal } from './journal-early-start-modal';

@NgModule({
  declarations: [
    JournalEarlyStartModal,
  ],
  imports: [
    IonicPageModule.forChild(JournalEarlyStartModal),
    ComponentsModule,
  ],
  exports: [
    JournalEarlyStartModal,
  ],
})
export class JournalEarlyStartModule { }
