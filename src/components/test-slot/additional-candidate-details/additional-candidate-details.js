var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var AdditionalCandidateDetailsComponent = /** @class */ (function () {
    function AdditionalCandidateDetailsComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AdditionalCandidateDetailsComponent.prototype, "prn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AdditionalCandidateDetailsComponent.prototype, "attempts", void 0);
    AdditionalCandidateDetailsComponent = __decorate([
        Component({
            selector: 'additional-candidate-details',
            templateUrl: 'additional-candidate-details.html',
        }),
        __metadata("design:paramtypes", [])
    ], AdditionalCandidateDetailsComponent);
    return AdditionalCandidateDetailsComponent;
}());
export { AdditionalCandidateDetailsComponent };
//# sourceMappingURL=additional-candidate-details.js.map