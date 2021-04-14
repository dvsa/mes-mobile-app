var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatAMod1Page } from './pass-finalisation.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';
import { PassFinalisationCatAMod1ComponentsModule } from './components/pass-finalisation.cat-a-mod1.components.module';
var PassFinalisationCatAMod1PageModule = /** @class */ (function () {
    function PassFinalisationCatAMod1PageModule() {
    }
    PassFinalisationCatAMod1PageModule = __decorate([
        NgModule({
            declarations: [
                PassFinalisationCatAMod1Page,
            ],
            imports: [
                IonicPageModule.forChild(PassFinalisationCatAMod1Page),
                EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
                ComponentsModule,
                TestFinalisationComponentsModule,
                PassFinalisationComponentsModule,
                PassFinalisationCatAMod1ComponentsModule,
            ],
        })
    ], PassFinalisationCatAMod1PageModule);
    return PassFinalisationCatAMod1PageModule;
}());
export { PassFinalisationCatAMod1PageModule };
//# sourceMappingURL=pass-finalisation.cat-a-mod1.page.module.js.map