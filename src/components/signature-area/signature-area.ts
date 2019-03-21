import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { StoreModel } from '../../shared/models/store.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'signature-area',
  templateUrl: 'signature-area.html',
})
export class SignatureAreaComponent {
  public signature: string;
  public isvalid: boolean;
  public retryImage: string;
  public notValidHeaderText: string;
  public retryButtonText: string;
  public signHereText: string;
  public signHereImage: string;
  public drawCompleteAction: string;
  public clearAction: string;
  public actionLess: boolean;

  @ViewChild(SignaturePad)
  signaturePad: SignaturePad;

  constructor(private store$: Store<StoreModel>) {
    this.signature = null;
    this.isvalid = null;
    this.actionLess = false;
    this.signHereImage = '/assets/imgs/waiting-room/sign-here.png';
    this.retryImage = '/assets/imgs/waiting-room/retry.png';
  }

  public getSignature() {
    return this.signature;
  }
  public setSignature(initialValue: string) {
    this.signaturePad.fromDataURL(initialValue);
    // loading the signature from initial value does not set the internal signature stucture, so setting here.
    this.signature = initialValue;
    this.signatureDataChangedDispatch(initialValue);
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.resizeCanvas();
  }

  clear() {
    this.signaturePad.clear();
    this.signature = null;
    this.signatureDataClearedDispatch();
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL('image/png');
    this.signatureDataChangedDispatch(this.signature);
  }

  signatureDataChangedDispatch(signatureData: string) {
    if (!this.actionLess) {
      this.store$.dispatch({ payload: signatureData, type: this.drawCompleteAction });
    }
  }
  signatureDataClearedDispatch() {
    if (!this.actionLess) {
      this.store$.dispatch({ type: this.clearAction });
    }
  }
}
