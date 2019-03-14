import { Component, ViewChild, Input } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';

@Component({
  selector: 'mes-signature-pad',
  templateUrl: 'mes-signature-pad.html',
})
export class MesSignaturePadComponent {
  signaturePadOptions: any;
  signature: string;
  options: any;

  @ViewChild(SignaturePad)
  signaturePad: SignaturePad;

  @Input() required: boolean;
  @Input() signAreaHeaderText: string;
  @Input() retryButtonText: string;
  @Input() signHereText: string;
  @Input() signHereImage: string;
  @Input() retryImage: string;


  constructor(public configService: AppConfigProvider) {
    this.signaturePadOptions = {
      minWidth: 5,
      canvasWidth: 500,
      canvasHeight: 300,
      throttle: 0,
      backgroundColor: '#ffffff',
    };  // configService.getSignaturePadOptions();
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.resizeCanvas();
  }

  clear() {
    this.signaturePad.clear();
    this.signature = null;
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL();
  }

  getSignature() {
    return this.signature;
  }
}
