var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatAMod2Page } from './communication.cat-a-mod2.page';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../components/communication.components.module';
var CommunicationCatAMod2PageModule = /** @class */ (function () {
    function CommunicationCatAMod2PageModule() {
    }
    CommunicationCatAMod2PageModule = __decorate([
        NgModule({
            declarations: [
                CommunicationCatAMod2Page,
            ],
            imports: [
                IonicPageModule.forChild(CommunicationCatAMod2Page),
                EffectsModule.forFeature([
                    CommunicationEffects,
                    CommunicationAnalyticsEffects,
                ]),
                ComponentsModule,
                TranslateModule,
                CommunicationComponentsModule,
            ],
        })
    ], CommunicationCatAMod2PageModule);
    return CommunicationCatAMod2PageModule;
}());
export { CommunicationCatAMod2PageModule };
//# sourceMappingURL=communication.cat-a-mod2.page.module.js.map