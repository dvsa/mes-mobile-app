var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { D255Component } from './d255/d255';
import { DebriefWitnessedComponent } from './debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from './language-preference/language-preferences';
import { FinalisationHeaderComponent } from './finalisation-header/finalisation-header';
var TestFinalisationComponentsModule = /** @class */ (function () {
    function TestFinalisationComponentsModule() {
    }
    TestFinalisationComponentsModule = __decorate([
        NgModule({
            declarations: [
                LanguagePreferencesComponent,
                D255Component,
                DebriefWitnessedComponent,
                FinalisationHeaderComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
            ],
            exports: [
                LanguagePreferencesComponent,
                D255Component,
                DebriefWitnessedComponent,
                FinalisationHeaderComponent,
            ],
        })
    ], TestFinalisationComponentsModule);
    return TestFinalisationComponentsModule;
}());
export { TestFinalisationComponentsModule };
//# sourceMappingURL=test-finalisation-component.module.js.map