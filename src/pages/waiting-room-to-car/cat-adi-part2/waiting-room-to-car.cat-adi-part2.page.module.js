var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatADIPart2Page } from './waiting-room-to-car.cat-adi-part2.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatADIPart2ComponentsModule } from './components/waiting-room-to-car.cat-adi-part2.components.module';
var WaitingRoomToCarCatADIPart2PageModule = /** @class */ (function () {
    function WaitingRoomToCarCatADIPart2PageModule() {
    }
    WaitingRoomToCarCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                WaitingRoomToCarCatADIPart2Page,
            ],
            imports: [
                IonicPageModule.forChild(WaitingRoomToCarCatADIPart2Page),
                EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
                ComponentsModule,
                WaitingRoomToCarComponentsModule,
                WaitingRoomToCarCatADIPart2ComponentsModule,
            ],
        })
    ], WaitingRoomToCarCatADIPart2PageModule);
    return WaitingRoomToCarCatADIPart2PageModule;
}());
export { WaitingRoomToCarCatADIPart2PageModule };
//# sourceMappingURL=waiting-room-to-car.cat-adi-part2.page.module.js.map