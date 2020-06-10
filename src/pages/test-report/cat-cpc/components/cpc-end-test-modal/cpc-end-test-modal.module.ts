import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CPCEndTestModal } from './cpc-end-test-modal';
import { ModalResultItemComponent } from './components/modal-result-item/modal-result-item';

@NgModule({
  declarations: [
    CPCEndTestModal,
    ModalResultItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(CPCEndTestModal),
  ],
  exports: [
    CPCEndTestModal,
    ModalResultItemComponent,
  ],
})
export class CPCEndTestModalModule { }
