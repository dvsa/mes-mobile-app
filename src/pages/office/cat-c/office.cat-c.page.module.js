var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatCPage } from './office.cat-c.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { PassFinalisationComponentsModule } from '../../pass-finalisation/components/pass-finalisation-components.module';
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
var OfficeCatCPageModule = /** @class */ (function () {
    function OfficeCatCPageModule() {
    }
    OfficeCatCPageModule = __decorate([
        NgModule({
            declarations: [
                OfficeCatCPage,
            ],
            imports: [
                IonicPageModule.forChild(OfficeCatCPage),
                EffectsModule.forFeature([
                    OfficeAnalyticsEffects,
                    OfficeEffects,
                ]),
                ComponentsModule,
                OfficeComponentsModule,
                PassFinalisationComponentsModule,
                TestFinalisationComponentsModule,
            ],
            providers: [
                FaultSummaryProvider,
            ],
        })
    ], OfficeCatCPageModule);
    return OfficeCatCPageModule;
}());
export { OfficeCatCPageModule };
//# sourceMappingURL=office.cat-c.page.module.js.map