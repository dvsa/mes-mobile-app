import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LWSosAlertModal } from './lw-sos-alert-modal.page';
import { LWAlertButtonComponent } from '../lw-alert-button/lw-alert-button';

@NgModule({
  declarations: [
    LWSosAlertModal,
    LWAlertButtonComponent,
  ],
  imports: [
    IonicPageModule.forChild(LWSosAlertModal),
    IonicModule,
  ],
})
export class LWSosAlertModalPageModule { }
