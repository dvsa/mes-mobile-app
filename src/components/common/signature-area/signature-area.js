var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Store } from '@ngrx/store';
var SignatureAreaComponent = /** @class */ (function () {
    function SignatureAreaComponent(store$) {
        this.store$ = store$;
        // we use it to emit changes back to the form
        this.propagateChange = function (_) { };
        this.touchChange = function (_) { };
        this.signature = null;
        this.isvalid = null;
        this.actionLess = false;
        this.signHereImage = '/assets/imgs/waiting-room/sign-here.png';
        this.retryImage = '/assets/imgs/waiting-room/retry.png';
    }
    SignatureAreaComponent_1 = SignatureAreaComponent;
    SignatureAreaComponent.prototype.getSignature = function () {
        return this.signature;
    };
    SignatureAreaComponent.prototype.setSignature = function (initialValue) {
        this.signaturePad.fromDataURL(initialValue);
        // loading the signature from initial value does not set the internal signature stucture, so setting here.
        this.signature = initialValue;
        this.signatureDataChangedDispatch(initialValue);
        this.propagateChange(this.signature);
    };
    SignatureAreaComponent.prototype.ngAfterViewInit = function () {
        this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        this.signaturePad.resizeCanvas();
        if (this.signature) {
            this.setSignature(this.signature);
        }
    };
    SignatureAreaComponent.prototype.clear = function () {
        this.signaturePad.clear();
        this.signature = null;
        this.signatureDataClearedDispatch();
        this.propagateChange(this.signature);
    };
    SignatureAreaComponent.prototype.drawComplete = function () {
        this.signature = this.signaturePad.toDataURL('image/svg+xml');
        this.signatureDataChangedDispatch(this.signature);
        this.propagateChange(this.signature);
        this.touchChange(null);
    };
    SignatureAreaComponent.prototype.signatureDataChangedDispatch = function (signatureData) {
        if (!this.actionLess) {
            this.store$.dispatch({ payload: signatureData, type: this.drawCompleteAction });
        }
    };
    SignatureAreaComponent.prototype.signatureDataClearedDispatch = function () {
        if (!this.actionLess) {
            this.store$.dispatch({ type: this.clearAction });
        }
    };
    SignatureAreaComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.signature = value;
        }
    };
    SignatureAreaComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SignatureAreaComponent.prototype.onTouched = function () {
        this.touchChange(null);
    };
    SignatureAreaComponent.prototype.registerOnTouched = function (fn) {
        this.touchChange = fn;
    };
    var SignatureAreaComponent_1;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureAreaComponent.prototype, "signature", void 0);
    __decorate([
        ViewChild(SignaturePad),
        __metadata("design:type", SignaturePad)
    ], SignatureAreaComponent.prototype, "signaturePad", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureAreaComponent.prototype, "retryButtonText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureAreaComponent.prototype, "signHereText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureAreaComponent.prototype, "validationErrorText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SignatureAreaComponent.prototype, "showValidText", void 0);
    SignatureAreaComponent = SignatureAreaComponent_1 = __decorate([
        Component({
            selector: 'signature-area',
            templateUrl: 'signature-area.html',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return SignatureAreaComponent_1; }),
                    multi: true,
                },
            ],
        }),
        __metadata("design:paramtypes", [Store])
    ], SignatureAreaComponent);
    return SignatureAreaComponent;
}());
export { SignatureAreaComponent };
//# sourceMappingURL=signature-area.js.map