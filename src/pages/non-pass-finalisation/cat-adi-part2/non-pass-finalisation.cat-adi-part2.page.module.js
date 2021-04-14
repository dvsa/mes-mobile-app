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
import { NonPassFinalisationCatADIPart2Page } from './non-pass-finalisation.cat-adi-part2.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import { ActivityCodeFinalisationProvider, } from '../../../providers/activity-code-finalisation/activity-code-finalisation';
var NonPassFinalisationCatADIPart2PageModule = /** @class */ (function () {
    function NonPassFinalisationCatADIPart2PageModule() {
    }
    NonPassFinalisationCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                NonPassFinalisationCatADIPart2Page,
            ],
            imports: [
                IonicPageModule.forChild(NonPassFinalisationCatADIPart2Page),
                EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
                ComponentsModule,
                TestFinalisationComponentsModule,
            ],
            providers: [ActivityCodeFinalisationProvider],
        })
    ], NonPassFinalisationCatADIPart2PageModule);
    return NonPassFinalisationCatADIPart2PageModule;
}());
export { NonPassFinalisationCatADIPart2PageModule };
//# sourceMappingURL=non-pass-finalisation.cat-adi-part2.page.module.js.map