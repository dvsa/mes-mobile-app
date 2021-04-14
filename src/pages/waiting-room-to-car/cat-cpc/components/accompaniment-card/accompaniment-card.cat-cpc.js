var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
var AccompanimentCardCatCPCComponent = /** @class */ (function () {
    function AccompanimentCardCatCPCComponent() {
        this.supervisorAccompanimentChange = new EventEmitter();
        this.interpreterAccompanimentChange = new EventEmitter();
    }
    AccompanimentCardCatCPCComponent.prototype.supervisorAccompanimentChanged = function () {
        this.supervisorAccompanimentChange.emit();
    };
    AccompanimentCardCatCPCComponent.prototype.interpreterAccompanimentChanged = function () {
        this.interpreterAccompanimentChange.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], AccompanimentCardCatCPCComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentCardCatCPCComponent.prototype, "supervisorAccompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentCardCatCPCComponent.prototype, "interpreterAccompaniment", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentCardCatCPCComponent.prototype, "supervisorAccompanimentChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentCardCatCPCComponent.prototype, "interpreterAccompanimentChange", void 0);
    AccompanimentCardCatCPCComponent = __decorate([
        Component({
            selector: 'accompaniment-card-cat-cpc',
            templateUrl: 'accompaniment-card.cat-cpc.html',
        })
    ], AccompanimentCardCatCPCComponent);
    return AccompanimentCardCatCPCComponent;
}());
export { AccompanimentCardCatCPCComponent };
//# sourceMappingURL=accompaniment-card.cat-cpc.js.map