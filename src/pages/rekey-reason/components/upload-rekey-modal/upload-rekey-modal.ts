import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UploadRekeyModalEvent } from './upload-rekey-modal.constants';

@IonicPage()
@Component({
  selector: 'upload-rekey-modal',
  templateUrl: 'upload-rekey-modal.html',
})
export class UploadRekeyModal {

  retryMode: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    public params: NavParams,
  ) {
    this.retryMode = params.get('retryMode');
  }

  onCancel() {
    this.viewCtrl.dismiss(UploadRekeyModalEvent.CANCEL);
  }

  onUpload() {
    this.viewCtrl.dismiss(UploadRekeyModalEvent.UPLOAD);
  }

}
