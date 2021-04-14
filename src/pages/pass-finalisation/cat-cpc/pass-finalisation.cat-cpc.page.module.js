var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { TestFinalisationComponentsModule, } from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';
import { PassFinalisationCatCPCPage } from './pass-finalisation.cat-cpc.page';
var PassFinalisationCatCPCPageModule = /** @class */ (function () {
    function PassFinalisationCatCPCPageModule() {
    }
    PassFinalisationCatCPCPageModule = __decorate([
        NgModule({
            declarations: [
                PassFinalisationCatCPCPage,
            ],
            imports: [
                IonicPageModule.forChild(PassFinalisationCatCPCPage),
                EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
                ComponentsModule,
                TestFinalisationComponentsModule,
                PassFinalisationComponentsModule,
            ],
        })
    ], PassFinalisationCatCPCPageModule);
    return PassFinalisationCatCPCPageModule;
}());
export { PassFinalisationCatCPCPageModule };
//# sourceMappingURL=pass-finalisation.cat-cpc.page.module.js.map