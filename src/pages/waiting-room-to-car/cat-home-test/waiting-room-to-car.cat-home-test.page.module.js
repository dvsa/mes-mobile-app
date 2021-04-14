var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatHomeTestPage } from './waiting-room-to-car.cat-home-test.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatHomeTestComponentsModule } from './components/waiting-room-to-car.cat-home-test.components.module';
var WaitingRoomToCarCatHomeTestPageModule = /** @class */ (function () {
    function WaitingRoomToCarCatHomeTestPageModule() {
    }
    WaitingRoomToCarCatHomeTestPageModule = __decorate([
        NgModule({
            declarations: [
                WaitingRoomToCarCatHomeTestPage,
            ],
            imports: [
                IonicPageModule.forChild(WaitingRoomToCarCatHomeTestPage),
                EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
                ComponentsModule,
                WaitingRoomToCarComponentsModule,
                WaitingRoomToCarCatHomeTestComponentsModule,
            ],
        })
    ], WaitingRoomToCarCatHomeTestPageModule);
    return WaitingRoomToCarCatHomeTestPageModule;
}());
export { WaitingRoomToCarCatHomeTestPageModule };
//# sourceMappingURL=waiting-room-to-car.cat-home-test.page.module.js.map