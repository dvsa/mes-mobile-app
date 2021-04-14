var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatDPage } from './office.cat-d.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../../pass-finalisation/components/pass-finalisation-components.module';
var OfficeCatDPageModule = /** @class */ (function () {
    function OfficeCatDPageModule() {
    }
    OfficeCatDPageModule = __decorate([
        NgModule({
            declarations: [
                OfficeCatDPage,
            ],
            imports: [
                IonicPageModule.forChild(OfficeCatDPage),
                EffectsModule.forFeature([
                    OfficeAnalyticsEffects,
                    OfficeEffects,
                ]),
                ComponentsModule,
                OfficeComponentsModule,
                TestFinalisationComponentsModule,
                PassFinalisationComponentsModule,
            ],
            providers: [
                FaultSummaryProvider,
            ],
        })
    ], OfficeCatDPageModule);
    return OfficeCatDPageModule;
}());
export { OfficeCatDPageModule };
//# sourceMappingURL=office.cat-d.page.module.js.map