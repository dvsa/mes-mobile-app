var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostListener } from '@angular/core';
import { includes } from 'lodash';
var InputRestrictionNumbersDirective = /** @class */ (function () {
    function InputRestrictionNumbersDirective(el) {
        this.el = el;
        // Allow usage of control keys aswell as numbers, useful for the browser
        this.controlKeys = ['ArrowRight', 'ArrowLeft', 'Backspace'];
    }
    InputRestrictionNumbersDirective.prototype.onKeyDown = function (e) {
        var key = e.key;
        if (includes(this.controlKeys, key)) {
            return;
        }
        if (key < '0' || key > '9') {
            e.preventDefault();
        }
    };
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], InputRestrictionNumbersDirective.prototype, "onKeyDown", null);
    InputRestrictionNumbersDirective = __decorate([
        Directive({
            selector: '[numbersOnly]',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], InputRestrictionNumbersDirective);
    return InputRestrictionNumbersDirective;
}());
export { InputRestrictionNumbersDirective };
//# sourceMappingURL=input-restriction-numbers.directive.js.map