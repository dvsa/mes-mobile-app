import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LWSosAlertModal } from './lw-sos-alert-modal.page';

@NgModule({
  declarations: [
    LWSosAlertModal,
  ],
  imports: [
    IonicPageModule.forChild(LWSosAlertModal),
    IonicModule,
  ],
})
export class LWSosAlertModalPageModule { }
