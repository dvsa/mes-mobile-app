var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatBEPage } from './waiting-room-to-car.cat-be.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatBEComponentsModule } from './components/waiting-room-to-car.cat-be.components.module';
var WaitingRoomToCarCatBEPageModule = /** @class */ (function () {
    function WaitingRoomToCarCatBEPageModule() {
    }
    WaitingRoomToCarCatBEPageModule = __decorate([
        NgModule({
            declarations: [
                WaitingRoomToCarCatBEPage,
            ],
            imports: [
                IonicPageModule.forChild(WaitingRoomToCarCatBEPage),
                EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
                ComponentsModule,
                WaitingRoomToCarComponentsModule,
                WaitingRoomToCarCatBEComponentsModule,
            ],
        })
    ], WaitingRoomToCarCatBEPageModule);
    return WaitingRoomToCarCatBEPageModule;
}());
export { WaitingRoomToCarCatBEPageModule };
//# sourceMappingURL=waiting-room-to-car.cat-be.page.module.js.map