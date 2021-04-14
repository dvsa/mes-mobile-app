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
var SeriousFaultsDebriefCardComponent = /** @class */ (function () {
    function SeriousFaultsDebriefCardComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SeriousFaultsDebriefCardComponent.prototype, "seriousFaults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SeriousFaultsDebriefCardComponent.prototype, "testCategory", void 0);
    SeriousFaultsDebriefCardComponent = __decorate([
        Component({
            selector: 'serious-faults-debrief-card',
            templateUrl: 'serious-faults-debrief-card.html',
        })
    ], SeriousFaultsDebriefCardComponent);
    return SeriousFaultsDebriefCardComponent;
}());
export { SeriousFaultsDebriefCardComponent };
//# sourceMappingURL=serious-faults-debrief-card.js.map