var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommunicationCatHomeTestPage } from './communication.cat-home-test.page';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommunicationComponentsModule } from '../components/communication.components.module';
var CommunicationCatHomeTestPageModule = /** @class */ (function () {
    function CommunicationCatHomeTestPageModule() {
    }
    CommunicationCatHomeTestPageModule = __decorate([
        NgModule({
            declarations: [
                CommunicationCatHomeTestPage,
            ],
            imports: [
                IonicPageModule.forChild(CommunicationCatHomeTestPage),
                EffectsModule.forFeature([
                    CommunicationEffects,
                    CommunicationAnalyticsEffects,
                ]),
                ComponentsModule,
                TranslateModule,
                CommunicationComponentsModule,
            ],
        })
    ], CommunicationCatHomeTestPageModule);
    return CommunicationCatHomeTestPageModule;
}());
export { CommunicationCatHomeTestPageModule };
//# sourceMappingURL=communication.cat-home-test.page.module.js.map