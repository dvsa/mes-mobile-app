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
var CompetencyButtonComponent = /** @class */ (function () {
    function CompetencyButtonComponent() {
        var _this = this;
        this.ripple = true;
        this.disabled = false;
        this.touchState = false;
        this.touchStateDelay = 100;
        this.rippleState = false;
        this.rippleEffectAnimationDuration = 300;
        this.applyRippleEffect = function () {
            _this.rippleState = true;
            _this.rippleTimeout = setTimeout(function () { return _this.removeRippleEffect(); }, _this.rippleEffectAnimationDuration);
        };
        this.removeRippleEffect = function () {
            _this.rippleState = false;
            clearTimeout(_this.rippleTimeout);
        };
    }
    CompetencyButtonComponent.prototype.onTapEvent = function () {
        if (this.disabled) {
            return;
        }
        if (this.onTap) {
            this.onTap();
        }
    };
    CompetencyButtonComponent.prototype.onPressEvent = function () {
        if (this.disabled) {
            return;
        }
        if (this.onPress) {
            this.onPress();
        }
        if (this.ripple) {
            this.applyRippleEffect();
        }
    };
    CompetencyButtonComponent.prototype.onTouchStart = function () {
        if (this.disabled) {
            return;
        }
        clearTimeout(this.touchTimeout);
        this.touchState = true;
    };
    CompetencyButtonComponent.prototype.onTouchEnd = function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        // defer the removal of the touch state to allow the page to render
        this.touchTimeout = setTimeout(function () { return _this.touchState = false; }, this.touchStateDelay);
    };
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], CompetencyButtonComponent.prototype, "onPress", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], CompetencyButtonComponent.prototype, "onTap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CompetencyButtonComponent.prototype, "ripple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CompetencyButtonComponent.prototype, "disabled", void 0);
    CompetencyButtonComponent = __decorate([
        Component({
            selector: 'competency-button',
            templateUrl: 'competency-button.html',
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyButtonComponent);
    return CompetencyButtonComponent;
}());
export { CompetencyButtonComponent };
//# sourceMappingURL=competency-button.js.map