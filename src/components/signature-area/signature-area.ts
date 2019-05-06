import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { StoreModel } from '../../shared/models/store.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'signature-area',
  templateUrl: 'signature-area.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureAreaComponent),
      multi: true,
    },
  ],
})
export class SignatureAreaComponent implements ControlValueAccessor {
  public signature: string;
  public isvalid: boolean;
  public retryImage: string;
  public retryButtonText: string;
  public signHereText: string;
  public signHereImage: string;
  public drawCompleteAction: string;
  public clearAction: string;
  public actionLess: boolean;

  @Input()
  oldSignature: string;

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
    this.propagateChange(this.signature);
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.resizeCanvas();
    if (this.oldSignature) {
      this.setSignature(this.oldSignature);
    }
  }

  clear() {
    this.signaturePad.clear();
    this.signature = null;
    this.signatureDataClearedDispatch();
    this.propagateChange(this.signature);
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL('image/svg+xml');
    this.signatureDataChangedDispatch(this.signature);
    this.propagateChange(this.signature);
    this.touchChange(null);
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
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => { };
  private touchChange = (_: any) => { };

  public writeValue(value: any) {
    if (value !== undefined) {
      this.signature = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  onTouched() {
    this.touchChange(null);
  }
  registerOnTouched(fn: any) {
    this.touchChange = fn;
  }
}
