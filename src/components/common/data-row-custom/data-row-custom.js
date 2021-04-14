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
var DataRowCustomComponent = /** @class */ (function () {
    function DataRowCustomComponent() {
        this.shouldShowIndicator = false;
        this.shouldHaveSeperator = true;
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataRowCustomComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataRowCustomComponent.prototype, "shouldShowIndicator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataRowCustomComponent.prototype, "shouldHaveSeperator", void 0);
    DataRowCustomComponent = __decorate([
        Component({
            selector: 'data-row-custom',
            templateUrl: 'data-row-custom.html',
        }),
        __metadata("design:paramtypes", [])
    ], DataRowCustomComponent);
    return DataRowCustomComponent;
}());
export { DataRowCustomComponent };
//# sourceMappingURL=data-row-custom.js.map