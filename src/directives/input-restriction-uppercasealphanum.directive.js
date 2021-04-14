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
var InputRestrictionUppercaseAlphanumDirective = /** @class */ (function () {
    function InputRestrictionUppercaseAlphanumDirective(ref) {
        this.ref = ref;
    }
    InputRestrictionUppercaseAlphanumDirective.prototype.onInput = function (event) {
        this.ref.nativeElement.value = event.target.value
            .replace(/[^0-9a-z]/gi, '')
            .trim()
            .toUpperCase();
    };
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], InputRestrictionUppercaseAlphanumDirective.prototype, "onInput", null);
    InputRestrictionUppercaseAlphanumDirective = __decorate([
        Directive({
            selector: '[uppercaseAlphanumOnly]',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], InputRestrictionUppercaseAlphanumDirective);
    return InputRestrictionUppercaseAlphanumDirective;
}());
export { InputRestrictionUppercaseAlphanumDirective };
//# sourceMappingURL=input-restriction-uppercasealphanum.directive.js.map