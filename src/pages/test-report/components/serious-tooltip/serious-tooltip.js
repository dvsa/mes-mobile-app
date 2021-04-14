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
// TODO: Serious Tooltip should not cover the Dangerous button
var SeriousTooltipComponent = /** @class */ (function () {
    function SeriousTooltipComponent() {
        this.isRemoveMode = false;
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriousTooltipComponent.prototype, "isRemoveMode", void 0);
    SeriousTooltipComponent = __decorate([
        Component({
            selector: 'serious-tooltip',
            templateUrl: 'serious-tooltip.html',
        })
    ], SeriousTooltipComponent);
    return SeriousTooltipComponent;
}());
export { SeriousTooltipComponent };
//# sourceMappingURL=serious-tooltip.js.map