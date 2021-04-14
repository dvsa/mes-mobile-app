var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatADIPart2Page } from './office.cat-adi-part2.page';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { VehicleChecksOfficeCardCatADI2Component } from './components/vehicle-checks/vehicle-checks-office-card';
import { ShowMeQuestionsCatADI2Component } from './components/show-me-questions/show-me-questions';
var OfficeCatADIPart2PageModule = /** @class */ (function () {
    function OfficeCatADIPart2PageModule() {
    }
    OfficeCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                OfficeCatADIPart2Page,
                VehicleChecksOfficeCardCatADI2Component,
                ShowMeQuestionsCatADI2Component,
            ],
            imports: [
                IonicPageModule.forChild(OfficeCatADIPart2Page),
                EffectsModule.forFeature([
                    OfficeAnalyticsEffects,
                    OfficeEffects,
                ]),
                ComponentsModule,
                OfficeComponentsModule,
            ],
            providers: [
                FaultSummaryProvider,
            ],
        })
    ], OfficeCatADIPart2PageModule);
    return OfficeCatADIPart2PageModule;
}());
export { OfficeCatADIPart2PageModule };
//# sourceMappingURL=office.cat-adi-part2.page.module.js.map