import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'signature-area',
  templateUrl: 'signature-area.html',
})
export class SignatureAreaComponent {
  @Output() changedDataEvent = new EventEmitter<string>();
  @Output() dataClearedEvent = new EventEmitter<string>();
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

  constructor() {
    this.isvalid = null;
  }

  public getSignature() {
    return this.signature;
  }
  public setSignature(initialValue: string) {
    this.signaturePad.fromDataURL(initialValue);
    // loading the signature from initial value does not set the internal signature stucture, so setting here.
    this.signature = initialValue;
    this.isvalid = true;
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
    this.dataClearedEvent.emit();
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
    this.signature = this.signaturePad.toDataURL('image/png');
    this.changedDataEvent.emit(this.signature);
  }
}
