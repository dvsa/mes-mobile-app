var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatADIPart2Page } from './communication.cat-adi-part2.page';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../components/communication.components.module';
var CommunicationCatADIPart2PageModule = /** @class */ (function () {
    function CommunicationCatADIPart2PageModule() {
    }
    CommunicationCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                CommunicationCatADIPart2Page,
            ],
            imports: [
                IonicPageModule.forChild(CommunicationCatADIPart2Page),
                EffectsModule.forFeature([
                    CommunicationEffects,
                    CommunicationAnalyticsEffects,
                ]),
                ComponentsModule,
                TranslateModule,
                CommunicationComponentsModule,
            ],
        })
    ], CommunicationCatADIPart2PageModule);
    return CommunicationCatADIPart2PageModule;
}());
export { CommunicationCatADIPart2PageModule };
//# sourceMappingURL=communication.cat-adi-part2.page.module.js.map