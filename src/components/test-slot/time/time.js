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
var TimeComponent = /** @class */ (function () {
    function TimeComponent() {
    }
    TimeComponent.prototype.ngOnInit = function () {
        // TODO pick up testComplete from JSON when available
        this.testComplete = true;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TimeComponent.prototype, "time", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TimeComponent.prototype, "testComplete", void 0);
    TimeComponent = __decorate([
        Component({
            selector: 'time',
            templateUrl: 'time.html',
        }),
        __metadata("design:paramtypes", [])
    ], TimeComponent);
    return TimeComponent;
}());
export { TimeComponent };
//# sourceMappingURL=time.js.map