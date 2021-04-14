var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatAMod1Page } from './waiting-room-to-car.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
var WaitingRoomToCarCatAMod1PageModule = /** @class */ (function () {
    function WaitingRoomToCarCatAMod1PageModule() {
    }
    WaitingRoomToCarCatAMod1PageModule = __decorate([
        NgModule({
            declarations: [
                WaitingRoomToCarCatAMod1Page,
            ],
            imports: [
                IonicPageModule.forChild(WaitingRoomToCarCatAMod1Page),
                EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
                ComponentsModule,
                WaitingRoomToCarComponentsModule,
            ],
        })
    ], WaitingRoomToCarCatAMod1PageModule);
    return WaitingRoomToCarCatAMod1PageModule;
}());
export { WaitingRoomToCarCatAMod1PageModule };
//# sourceMappingURL=waiting-room-to-car.cat-a-mod1.page.module.js.map