import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CpcEndTestModal } from './cpc-end-test-modal';

@NgModule({
  declarations: [
    CpcEndTestModal,
  ],
  imports: [
    IonicPageModule.forChild(CpcEndTestModal),
  ],
  exports: [
    CpcEndTestModal,
  ],
})
export class CpcEndTestModalModule { }
