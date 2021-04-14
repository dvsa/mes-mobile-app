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
var ModalResultItemComponent = /** @class */ (function () {
    function ModalResultItemComponent() {
    }
    ModalResultItemComponent.prototype.getOutcomeIcon = function () {
        var passImage = 'assets/imgs/greenCorrectAnswer.png';
        var failImage = 'assets/imgs/redWrongAnswer.png';
        return (this.isPass ? passImage : failImage);
    };
    /**
     * Function to return zero is score is null or undefined
     * @param score
     */
    ModalResultItemComponent.prototype.displayScore = function (score) {
        return score ? score : 0;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModalResultItemComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalResultItemComponent.prototype, "score", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ModalResultItemComponent.prototype, "isPass", void 0);
    ModalResultItemComponent = __decorate([
        Component({
            selector: 'modal-result-item',
            templateUrl: 'modal-result-item.html',
        })
    ], ModalResultItemComponent);
    return ModalResultItemComponent;
}());
export { ModalResultItemComponent };
//# sourceMappingURL=modal-result-item.js.map