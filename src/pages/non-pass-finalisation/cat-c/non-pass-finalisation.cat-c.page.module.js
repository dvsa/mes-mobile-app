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
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatCPage } from './non-pass-finalisation.cat-c.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import { ActivityCodeFinalisationProvider, } from '../../../providers/activity-code-finalisation/activity-code-finalisation';
var NonPassFinalisationCatCPageModule = /** @class */ (function () {
    function NonPassFinalisationCatCPageModule() {
    }
    NonPassFinalisationCatCPageModule = __decorate([
        NgModule({
            declarations: [
                NonPassFinalisationCatCPage,
            ],
            imports: [
                IonicPageModule.forChild(NonPassFinalisationCatCPage),
                EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
                ComponentsModule,
                TestFinalisationComponentsModule,
            ],
            providers: [ActivityCodeFinalisationProvider],
        })
    ], NonPassFinalisationCatCPageModule);
    return NonPassFinalisationCatCPageModule;
}());
export { NonPassFinalisationCatCPageModule };
//# sourceMappingURL=non-pass-finalisation.cat-c.page.module.js.map