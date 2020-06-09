import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CpcEndTestModal } from './cpc-end-test-modal';
import { ModalResultItemComponent } from './components/modal-result-item/modal-result-item';

@NgModule({
  declarations: [
    CpcEndTestModal,
    ModalResultItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(CpcEndTestModal),
  ],
  exports: [
    CpcEndTestModal,
    ModalResultItemComponent,
  ],
})
export class CpcEndTestModalModule { }
