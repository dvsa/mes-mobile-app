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
var ProfileHeaderComponent = /** @class */ (function () {
    function ProfileHeaderComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ProfileHeaderComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ProfileHeaderComponent.prototype, "role", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ProfileHeaderComponent.prototype, "employeeId", void 0);
    ProfileHeaderComponent = __decorate([
        Component({
            selector: 'profile-header',
            templateUrl: 'profile-header.html',
        })
    ], ProfileHeaderComponent);
    return ProfileHeaderComponent;
}());
export { ProfileHeaderComponent };
//# sourceMappingURL=profile-header.js.map