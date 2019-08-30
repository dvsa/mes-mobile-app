import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticeTestModal } from './practice-test-modal';

@NgModule({
  declarations: [
    PracticeTestModal,
  ],
  imports: [
    IonicPageModule.forChild(PracticeTestModal),
  ],
  exports: [
    PracticeTestModal,
  ],
})
export class PracticeTestModalModule { }
