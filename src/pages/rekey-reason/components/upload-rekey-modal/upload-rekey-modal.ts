import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ModalEvent } from './upload-rekey-modal.constants';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';

@IonicPage()
@Component({
  selector: 'upload-rekey-modal',
  templateUrl: 'upload-rekey-modal.html',
})
export class UploadRekeyModal {

  retryMode: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    public store$: Store<StoreModel>,
    public params: NavParams,
  ) {
    this.retryMode = params.get('retryMode');
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onUpload() {
    this.viewCtrl.dismiss(ModalEvent.UPLOAD);
  }

}
