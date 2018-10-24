import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppConfigProvider } from '../../providers/app-config/app-config';

@Component({
  selector: 'page-eyesight-fault-recording-modal',
  templateUrl: 'eyesight-fault-recording-modal.html'
})
export class EyesightFaultRecordingModalPage {
  signaturePadOptions: any;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(private viewController: ViewController, configService: AppConfigProvider) {
    this.signaturePadOptions = configService.getSignaturePadOptions();
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
  }

  ionViewDidLoad() {
    this.signaturePad.resizeCanvas();
  }

  dismiss() {
    this.viewController.dismiss(false);
  }

  markAndDismiss() {
    this.viewController.dismiss(true);
  }
}
