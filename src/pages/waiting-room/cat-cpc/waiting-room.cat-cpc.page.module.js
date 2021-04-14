var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { WaitingRoomComponentsModule } from '../components/waiting-room.components.module';
import { WaitingRoomCatCPCPage } from './waiting-room.cat-cpc.page';
var WaitingRoomCatCPCPageModule = /** @class */ (function () {
    function WaitingRoomCatCPCPageModule() {
    }
    WaitingRoomCatCPCPageModule = __decorate([
        NgModule({
            declarations: [
                WaitingRoomCatCPCPage,
            ],
            imports: [
                IonicPageModule.forChild(WaitingRoomCatCPCPage),
                EffectsModule.forFeature([
                    WaitingRoomAnalyticsEffects,
                ]),
                WaitingRoomComponentsModule,
                ComponentsModule,
                ReactiveFormsModule,
                TranslateModule,
            ],
        })
    ], WaitingRoomCatCPCPageModule);
    return WaitingRoomCatCPCPageModule;
}());
export { WaitingRoomCatCPCPageModule };
//# sourceMappingURL=waiting-room.cat-cpc.page.module.js.map