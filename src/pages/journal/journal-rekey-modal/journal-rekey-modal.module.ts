import { JournalRekeyModal } from './journal-rekey-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common.components.module';

@NgModule({
  declarations: [
    JournalRekeyModal,
  ],
  imports: [
    IonicPageModule.forChild(JournalRekeyModal),
    ComponentsModule,
  ],
  exports: [
    JournalRekeyModal,
  ],
})
export class JournalRekeyModalModule { }
