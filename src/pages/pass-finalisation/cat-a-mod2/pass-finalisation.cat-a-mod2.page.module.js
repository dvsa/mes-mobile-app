var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatAMod2Page } from './pass-finalisation.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';
var PassFinalisationCatAMod2PageModule = /** @class */ (function () {
    function PassFinalisationCatAMod2PageModule() {
    }
    PassFinalisationCatAMod2PageModule = __decorate([
        NgModule({
            declarations: [
                PassFinalisationCatAMod2Page,
            ],
            imports: [
                IonicPageModule.forChild(PassFinalisationCatAMod2Page),
                EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
                ComponentsModule,
                TestFinalisationComponentsModule,
                PassFinalisationComponentsModule,
            ],
        })
    ], PassFinalisationCatAMod2PageModule);
    return PassFinalisationCatAMod2PageModule;
}());
export { PassFinalisationCatAMod2PageModule };
//# sourceMappingURL=pass-finalisation.cat-a-mod2.page.module.js.map