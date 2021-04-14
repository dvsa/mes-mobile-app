var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatBPage } from './communication.cat-b.page';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../components/communication.components.module';
var CommunicationCatBPageModule = /** @class */ (function () {
    function CommunicationCatBPageModule() {
    }
    CommunicationCatBPageModule = __decorate([
        NgModule({
            declarations: [
                CommunicationCatBPage,
            ],
            imports: [
                IonicPageModule.forChild(CommunicationCatBPage),
                EffectsModule.forFeature([
                    CommunicationEffects,
                    CommunicationAnalyticsEffects,
                ]),
                ComponentsModule,
                TranslateModule,
                CommunicationComponentsModule,
            ],
        })
    ], CommunicationCatBPageModule);
    return CommunicationCatBPageModule;
}());
export { CommunicationCatBPageModule };
//# sourceMappingURL=communication.cat-b.page.module.js.map