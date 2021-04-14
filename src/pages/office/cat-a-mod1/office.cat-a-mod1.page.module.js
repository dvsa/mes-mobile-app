var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatAMod1Page } from './office.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { CircuitComponent } from './components/circuit/circuit';
import { DebriefCatAMod1ComponentsModule } from '../../debrief/cat-a-mod1/components/debrief.cat-a-mod1.components.module';
var OfficeCatAMod1PageModule = /** @class */ (function () {
    function OfficeCatAMod1PageModule() {
    }
    OfficeCatAMod1PageModule = __decorate([
        NgModule({
            declarations: [
                OfficeCatAMod1Page,
                CircuitComponent,
            ],
            imports: [
                IonicPageModule.forChild(OfficeCatAMod1Page),
                EffectsModule.forFeature([
                    OfficeAnalyticsEffects,
                    OfficeEffects,
                ]),
                ComponentsModule,
                OfficeComponentsModule,
                DebriefCatAMod1ComponentsModule,
            ],
            providers: [
                FaultSummaryProvider,
            ],
        })
    ], OfficeCatAMod1PageModule);
    return OfficeCatAMod1PageModule;
}());
export { OfficeCatAMod1PageModule };
//# sourceMappingURL=office.cat-a-mod1.page.module.js.map