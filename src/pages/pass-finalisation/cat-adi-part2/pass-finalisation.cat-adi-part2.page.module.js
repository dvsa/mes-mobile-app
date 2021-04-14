var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatADIPart2Page } from './pass-finalisation.cat-adi-part2.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
var PassFinalisationCatADIPart2PageModule = /** @class */ (function () {
    function PassFinalisationCatADIPart2PageModule() {
    }
    PassFinalisationCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                PassFinalisationCatADIPart2Page,
            ],
            imports: [
                IonicPageModule.forChild(PassFinalisationCatADIPart2Page),
                EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
                ComponentsModule,
                TestFinalisationComponentsModule,
            ],
        })
    ], PassFinalisationCatADIPart2PageModule);
    return PassFinalisationCatADIPart2PageModule;
}());
export { PassFinalisationCatADIPart2PageModule };
//# sourceMappingURL=pass-finalisation.cat-adi-part2.page.module.js.map