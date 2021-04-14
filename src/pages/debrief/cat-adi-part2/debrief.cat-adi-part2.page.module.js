var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatADIPart2Page } from './debrief.cat-adi-part2.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
var DebriefCatADIPart2PageModule = /** @class */ (function () {
    function DebriefCatADIPart2PageModule() {
    }
    DebriefCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                DebriefCatADIPart2Page,
            ],
            imports: [
                DebriefComponentsModule,
                IonicPageModule.forChild(DebriefCatADIPart2Page),
                EffectsModule.forFeature([
                    DebriefEffects,
                    DebriefAnalyticsEffects,
                ]),
                ComponentsModule,
                TranslateModule,
            ],
            providers: [
                FaultSummaryProvider,
            ],
        })
    ], DebriefCatADIPart2PageModule);
    return DebriefCatADIPart2PageModule;
}());
export { DebriefCatADIPart2PageModule };
//# sourceMappingURL=debrief.cat-adi-part2.page.module.js.map