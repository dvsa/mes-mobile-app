var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { InputRestrictionNumbersDirective } from './input-restriction-numbers.directive';
import { InputRestrictionUppercaseAlphanumDirective } from './input-restriction-uppercasealphanum.directive';
import { CharacterCountDirective } from './character-count.directive';
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        NgModule({
            declarations: [
                InputRestrictionNumbersDirective,
                InputRestrictionUppercaseAlphanumDirective,
                CharacterCountDirective,
            ],
            imports: [],
            exports: [
                InputRestrictionNumbersDirective,
                InputRestrictionUppercaseAlphanumDirective,
                CharacterCountDirective,
            ],
        })
    ], DirectivesModule);
    return DirectivesModule;
}());
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map