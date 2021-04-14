var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { WaitingRoomCatBPage } from './waiting-room.cat-b.page';
import { WaitingRoomComponentsModule } from '../components/waiting-room.components.module';
var WaitingRoomCatBPageModule = /** @class */ (function () {
    function WaitingRoomCatBPageModule() {
    }
    WaitingRoomCatBPageModule = __decorate([
        NgModule({
            declarations: [
                WaitingRoomCatBPage,
            ],
            imports: [
                IonicPageModule.forChild(WaitingRoomCatBPage),
                EffectsModule.forFeature([
                    WaitingRoomAnalyticsEffects,
                ]),
                WaitingRoomComponentsModule,
                ComponentsModule,
                ReactiveFormsModule,
                TranslateModule,
            ],
        })
    ], WaitingRoomCatBPageModule);
    return WaitingRoomCatBPageModule;
}());
export { WaitingRoomCatBPageModule };
//# sourceMappingURL=waiting-room.cat-b.page.module.js.map