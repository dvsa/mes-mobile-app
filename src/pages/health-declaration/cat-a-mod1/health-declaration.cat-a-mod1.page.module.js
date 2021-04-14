var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDeclarationCatAMod1Page } from './health-declaration.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { HealthDeclarationAnalyticsEffects } from '../health-declaration.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HealthDeclarationEffects } from '../health-declaration.effects';
import { HealthDeclarationComponentsModule } from '../components/health-declaration.components.module';
var HealthDeclarationCatAMod1PageModule = /** @class */ (function () {
    function HealthDeclarationCatAMod1PageModule() {
    }
    HealthDeclarationCatAMod1PageModule = __decorate([
        NgModule({
            declarations: [
                HealthDeclarationCatAMod1Page,
            ],
            imports: [
                IonicPageModule.forChild(HealthDeclarationCatAMod1Page),
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
    ], HealthDeclarationCatAMod1PageModule);
    return HealthDeclarationCatAMod1PageModule;
}());
export { HealthDeclarationCatAMod1PageModule };
//# sourceMappingURL=health-declaration.cat-a-mod1.page.module.js.map