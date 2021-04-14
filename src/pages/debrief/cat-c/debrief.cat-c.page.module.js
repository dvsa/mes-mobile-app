var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatCPage } from './debrief.cat-c.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
var DebriefCatCPageModule = /** @class */ (function () {
    function DebriefCatCPageModule() {
    }
    DebriefCatCPageModule = __decorate([
        NgModule({
            declarations: [
                DebriefCatCPage,
            ],
            imports: [
                DebriefComponentsModule,
                IonicPageModule.forChild(DebriefCatCPage),
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
    ], DebriefCatCPageModule);
    return DebriefCatCPageModule;
}());
export { DebriefCatCPageModule };
//# sourceMappingURL=debrief.cat-c.page.module.js.map