var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatAMod2Page } from './office.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafetyAndBalanceCardCatAMod2Component } from './components/safety-and-balance/safety-and-balance.cat-a-mod2';
import { ModeOfTransportCatAMod2Component } from './components/mode-of-transport/mode-of-transport.cat-a-mod2';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
var OfficeCatAMod2PageModule = /** @class */ (function () {
    function OfficeCatAMod2PageModule() {
    }
    OfficeCatAMod2PageModule = __decorate([
        NgModule({
            declarations: [
                OfficeCatAMod2Page,
                SafetyAndBalanceCardCatAMod2Component,
                ModeOfTransportCatAMod2Component,
            ],
            imports: [
                IonicPageModule.forChild(OfficeCatAMod2Page),
                EffectsModule.forFeature([
                    OfficeAnalyticsEffects,
                    OfficeEffects,
                ]),
                ComponentsModule,
                OfficeComponentsModule,
                TranslateModule,
            ],
            providers: [
                FaultSummaryProvider,
            ],
        })
    ], OfficeCatAMod2PageModule);
    return OfficeCatAMod2PageModule;
}());
export { OfficeCatAMod2PageModule };
//# sourceMappingURL=office.cat-a-mod2.page.module.js.map