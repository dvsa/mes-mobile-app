import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadRekeyModal } from './upload-rekey-modal';

@NgModule({
  declarations: [
    UploadRekeyModal,
  ],
  imports: [
    IonicPageModule.forChild(UploadRekeyModal),
  ],
  exports: [
    UploadRekeyModal,
  ],
})
export class UploadRekeyModalModule { }
