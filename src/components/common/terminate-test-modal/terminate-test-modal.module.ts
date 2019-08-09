import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminateTestModal } from './terminate-test-modal';

@NgModule({
  declarations: [
    TerminateTestModal,
  ],
  imports: [
    IonicPageModule.forChild(TerminateTestModal),
  ],
  exports: [
    TerminateTestModal,
  ],
})
export class TerminateTestModalModule { }
