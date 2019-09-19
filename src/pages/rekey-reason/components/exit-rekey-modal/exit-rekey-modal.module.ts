import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExitRekeyModal } from './exit-rekey-modal';

@NgModule({
  declarations: [
    ExitRekeyModal,
  ],
  imports: [
    IonicPageModule.forChild(ExitRekeyModal),
  ],
  exports: [
    ExitRekeyModal,
  ],
})
export class ExitRekeyModalModule { }
