var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { BackToOfficeCatCPCPage } from './back-to-office.cat-cpc.page';
import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';
var BackToOfficeCatCPCPageModule = /** @class */ (function () {
    function BackToOfficeCatCPCPageModule() {
    }
    BackToOfficeCatCPCPageModule = __decorate([
        NgModule({
            declarations: [
                BackToOfficeCatCPCPage,
            ],
            imports: [
                IonicPageModule.forChild(BackToOfficeCatCPCPage),
                EffectsModule.forFeature([
                    BackToOfficeAnalyticsEffects,
                ]),
                ComponentsModule,
                TranslateModule,
            ],
        })
    ], BackToOfficeCatCPCPageModule);
    return BackToOfficeCatCPCPageModule;
}());
export { BackToOfficeCatCPCPageModule };
//# sourceMappingURL=back-to-office.cat-cpc.page.module.js.map