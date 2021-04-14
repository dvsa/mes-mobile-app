var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
var ModalReturnButtonComponent = /** @class */ (function () {
    function ModalReturnButtonComponent() {
        this.onClick = new EventEmitter();
    }
    ModalReturnButtonComponent.prototype.onReturnClicked = function () {
        this.onClick.emit();
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalReturnButtonComponent.prototype, "onClick", void 0);
    ModalReturnButtonComponent = __decorate([
        Component({
            selector: 'modal-return-button',
            templateUrl: 'modal-return-button.html',
        }),
        __metadata("design:paramtypes", [])
    ], ModalReturnButtonComponent);
    return ModalReturnButtonComponent;
}());
export { ModalReturnButtonComponent };
//# sourceMappingURL=modal-return-button.js.map