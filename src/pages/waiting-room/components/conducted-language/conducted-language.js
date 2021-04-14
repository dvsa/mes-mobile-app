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
var ConductedLanguageComponent = /** @class */ (function () {
    function ConductedLanguageComponent() {
        this.welshTextSelect = new EventEmitter();
        this.englishTextSelect = new EventEmitter();
    }
    ConductedLanguageComponent.prototype.welshTextSelected = function () {
        this.welshIsSelected = true;
        this.englishIsSelected = false;
        this.welshTextSelect.emit();
    };
    ConductedLanguageComponent.prototype.englishTextSelected = function () {
        this.englishIsSelected = true;
        this.welshIsSelected = false;
        this.englishTextSelect.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ConductedLanguageComponent.prototype, "welshIsSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ConductedLanguageComponent.prototype, "englishIsSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ConductedLanguageComponent.prototype, "shouldRender", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ConductedLanguageComponent.prototype, "welshTextSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ConductedLanguageComponent.prototype, "englishTextSelect", void 0);
    ConductedLanguageComponent = __decorate([
        Component({
            selector: 'conducted-language',
            templateUrl: 'conducted-language.html',
        })
    ], ConductedLanguageComponent);
    return ConductedLanguageComponent;
}());
export { ConductedLanguageComponent };
//# sourceMappingURL=conducted-language.js.map