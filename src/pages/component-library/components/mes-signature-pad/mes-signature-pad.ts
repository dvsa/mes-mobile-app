import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';

@Component({
  selector: 'mes-signature-pad',
  templateUrl: 'mes-signature-pad.html',
})
export class MesSignaturePadComponent {
  public signature: string;
  public isvalid: boolean;
  public required: boolean;
  public retryImage: string;
  public notValidHeaderText: string;
  public retryButtonText: string;
  public signHereText: string;
  public signHereImage: string;

  @ViewChild(SignaturePad)
  signaturePad: SignaturePad;

  constructor(public configService: AppConfigProvider) {
    this.isvalid = null;
  }

  public getSignature() {
    return this.signature;
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.resizeCanvas();
  }

  clear() {
    this.signaturePad.clear();
    this.signature = null;
    this.isvalid = false;
  }

  checkAndSetValidation() {
    if (this.signature) {
      this.isvalid = true;
    } else {
      this.isvalid = false;
    }
  }

  drawComplete() {
    this.isvalid = true;
    this.signature = this.signaturePad.toDataURL();
  }
}
