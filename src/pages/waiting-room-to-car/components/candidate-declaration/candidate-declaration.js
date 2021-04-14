var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var DeclarationSigned;
(function (DeclarationSigned) {
    DeclarationSigned["YES"] = "Y";
    DeclarationSigned["NO"] = "N";
})(DeclarationSigned || (DeclarationSigned = {}));
var CandidateDeclarationSignedComponent = /** @class */ (function () {
    function CandidateDeclarationSignedComponent() {
        this.candidateDeclarationChange = new EventEmitter();
    }
    CandidateDeclarationSignedComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl('candidateDeclarationCtrl', this.formControl);
        }
        if (this.candidateSigned) {
            this.formControl.patchValue(this.declarationSelected ? DeclarationSigned.YES : DeclarationSigned.NO);
        }
    };
    Object.defineProperty(CandidateDeclarationSignedComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    CandidateDeclarationSignedComponent.prototype.candidateDeclarationChanged = function (declarationSelected) {
        if (this.formControl.valid) {
            this.candidateDeclarationChange.emit(declarationSelected === DeclarationSigned.YES);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CandidateDeclarationSignedComponent.prototype, "declarationSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CandidateDeclarationSignedComponent.prototype, "candidateSigned", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], CandidateDeclarationSignedComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CandidateDeclarationSignedComponent.prototype, "candidateDeclarationChange", void 0);
    CandidateDeclarationSignedComponent = __decorate([
        Component({
            selector: 'candidate-declaration-signed',
            templateUrl: 'candidate-declaration.html',
        })
    ], CandidateDeclarationSignedComponent);
    return CandidateDeclarationSignedComponent;
}());
export { CandidateDeclarationSignedComponent };
//# sourceMappingURL=candidate-declaration.js.map