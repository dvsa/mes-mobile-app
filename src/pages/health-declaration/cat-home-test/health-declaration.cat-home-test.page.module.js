var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { HealthDeclarationAnalyticsEffects } from '../health-declaration.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HealthDeclarationEffects } from '../health-declaration.effects';
import { HealthDeclarationComponentsModule } from '../components/health-declaration.components.module';
import { HealthDeclarationCatHomeTestPage } from './health-declaration.cat-home-test.page';
var HealthDeclarationCatHomeTestPageModule = /** @class */ (function () {
    function HealthDeclarationCatHomeTestPageModule() {
    }
    HealthDeclarationCatHomeTestPageModule = __decorate([
        NgModule({
            declarations: [
                HealthDeclarationCatHomeTestPage,
            ],
            imports: [
                IonicPageModule.forChild(HealthDeclarationCatHomeTestPage),
                EffectsModule.forFeature([
                    HealthDeclarationAnalyticsEffects,
                    HealthDeclarationEffects,
                ]),
                HealthDeclarationComponentsModule,
                ComponentsModule,
                ReactiveFormsModule,
                TranslateModule,
            ],
        })
    ], HealthDeclarationCatHomeTestPageModule);
    return HealthDeclarationCatHomeTestPageModule;
}());
export { HealthDeclarationCatHomeTestPageModule };
//# sourceMappingURL=health-declaration.cat-home-test.page.module.js.map