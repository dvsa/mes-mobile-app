import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ModalEvent } from './upload-rekey-modal.constants';

@IonicPage()
@Component({
  selector: 'upload-rekey-modal',
  templateUrl: 'upload-rekey-modal.html',
})
export class UploadRekeyModal {

  constructor(
    private viewCtrl: ViewController,
  ) {}

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onUpload() {
    this.viewCtrl.dismiss(ModalEvent.UPLOAD);
  }

}
